const express = require("express");
const session = require("express-session");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors")
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Conversation = require("./models/conversation.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: "loginUsername",
    passwordField: "loginPassword",
}, (username, password, done) => {
    User.findOne({
        username: username
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    })
}))

app.use(cors());
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
}))
app.use(passport.initialize());
app.use(passport.session());

const ATLAS_URI = process.env.ATLAS_URI;
mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () => console.log("Connected to the Atlas Database"));


const isRegisterValid = async user => {
    let errors = [];
    const {
        username,
        password,
        password2
    } = user;

    if (
        username.trim() === "" ||
        password.trim() === "" ||
        password2.trim() === ""
    ) {
        errors.push(0);
    }
    if (username.length < 3) {
        errors.push(1);
    }
    if (username.length > 10) {
        errors.push(2);
    }
    if (password.length < 3) {
        errors.push(3);
    }
    if (password !== password2) {
        errors.push(4);
    }
    const isUsernameTaken = await User.exists({
        username: username
    });
    if (isUsernameTaken) {
        errors.push(5);
    }
    return errors;
}


app.post("/register", async (req, res) => {
    const errors = await isRegisterValid(req.body);
    const isValid = errors.length === 0 ? true : false;
    if (isValid) {
        const {
            username,
            password
        } = req.body;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, function (err, hash) {
                const newUser = new User({
                    username: username,
                    password: hash
                });
                newUser.save()
                    .then(() => {
                        res.json("User added");
                    })
                    .catch(err => res.status(400).json({
                        error: err
                    }))
            });
        });

    } else {
        res.json({
            errors
        });
    }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({
        user: req.user
    })
})

app.get("/logout", (req, res) => {
    req.logout();
    res.json({
        user: null
    })
});

app.get("/isLoggedIn", (req, res) => {
    if (req.user) {
        res.json({
            user: req.user
        });
    } else {
        res.json({
            user: null
        })
    }
});

app.post("/createConversation", (req, res) => {
    const {
        conversationName,
        conversationDescription
    } = req.body;
    const user = req.user;
    Conversation.exists({
        name: conversationName
    }).then(exists => {
        if (!exists) {
            const newConversation = new Conversation({
                name: conversationName,
                description: conversationDescription,
                members: [user._id],
                admin: user._id
            })
            newConversation.save().then(() => res.json({
                conversationCreated: true
            })).catch(e => res.json({
                conversationCreated: false,
                error: e
            }));
        } else {
            res.json({
                conversationCreated: false,
                error: {
                    conversationExists: true
                }
            })
        }
    })

})

app.get("/getConversationList", (req, res) => {
    if (req.user) {
        Conversation.find().then(allConversations => {
            const filteredConversations = allConversations.filter(conversation => conversation.members.some(member => member.equals(req.user._id)));
            res.json({
                conversations: filteredConversations
            });
        })
    }
});

app.post("/deleteConversation", (req, res) => {
    const {
        id
    } = req.body;
    Conversation.findByIdAndDelete(id).then(conversation => conversation ? res.json({
        deleted: true
    }) : res.json({
        deleted: false
    })).catch(err => console.log(err));
});

app.post("/joinConversation", (req, res) => {
    const {
        conversationJoinName
    } = req.body;
    const {
        _id
    } = req.user;
    Conversation.findOne({
        name: conversationJoinName
    }).then(conversation => {
        if (conversation) {
            const isMember = conversation.members.some(member => member.equals(_id));
            const isCandidate = conversation.memberCandidates.some(candidate => candidate.equals(_id));
            const isNotPermitted = conversation.notPermitted.some(notPermitted => notPermitted.equals(_id));
            if (isMember) {
                return res.json({
                    status: 2 // Passed
                });
            }
            if (isNotPermitted) {
                return res.json({
                    status: -1 // Not permitted
                });
            }
            if (isCandidate) {
                return res.json({
                    status: 0 // Waiting
                });
            } else {
                conversation.memberCandidates.push(_id);
                conversation.save();
                return res.json({
                    status: 1 // First joining request send
                });
            }
        } else {
            return res.json({
                status: -2 // No conversation found
            });
        }
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));