const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");

const ConversationSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    description: {
        type: String,
        required: false,
        maxlength: 20,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: {
        type: Array
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;