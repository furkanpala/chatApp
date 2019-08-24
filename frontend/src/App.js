import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import notFound from "./components/notFound";
import { Switch, Route } from "react-router-dom";
import { Provider } from "./context";
import axios from "axios";
import DashboardRoute from "./routes/dashboardRoute";
import HomeRoute from "./routes/homeRoute";
import Chat from "./components/chat";

// prettier-ignore
const errors = [
  "All fields are required", // Error Code: 0
  "Username has to have at least 3 characters", // Error Code: 1
  "Username can not be longer than 10 characters", // Error Code: 2
  "Password has to have at least 3 characters", // Error Code: 3
  "Passwords did not match", // Error Code: 4
  "This username is already in use", // Error Code: 5
  "Conversation name has to have at least 3 characters", // Error Code: 6
  "Conversation name can not be longer than 20 characters", // Error Code: 7
  "Description can not be longer than 20 characters", // Error Code: 8
  "This conversation name is already in use" // Error Code: 9
];

// prettier-ignore
const conversationJoinMessages = [
  "There is no such conversation", // Status Code: -2
  "You are already a member of this conversation, check the 'My Conversations' below", // Status Code: 2
  "Join request sent", // Status Code: 1
  "Your request is waiting for the admin's approval", // Status Code: 0
  "You are not allowed to join this conversation" // Status Code: -1
];

const theme = createMuiTheme();

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "", // Registration info
      password: "", // Registration info
      password2: "", // Registration info
      validationErrors: [],
      showRegisterSuccessMessage: false,
      loginUsername: "",
      loginPassword: "",
      authenticatedUser: -1,
      showLoginFailedMessage: false,
      conversationCreateDialogStatus: false,
      conversationJoinDialogStatus: false,
      conversationName: "",
      conversationJoinName: "",
      conversationDescription: "",
      conversationList: [],
      deleteConfirmationStatus: false,
      conversationJoinStatus: "",
      conversationInfoDialog: false
    };
  }

  componentDidMount() {
    axios.get("/isLoggedIn").then(({ data: { user } }) => {
      this.setState({
        authenticatedUser: user
      });
      const { authenticatedUser } = this.state;
      if (authenticatedUser) {
        this.getConversationList();
      }
    });
  }

  handleMessage = () => {
    this.setState({
      showRegisterSuccessMessage: false,
      showLoginFailedMessage: false
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  removeValidationError = i => {
    const { validationErrors } = this.state;
    const index = validationErrors.indexOf(i);
    if (index !== -1) {
      this.setState({
        validationErrors: validationErrors.filter((_, i) => index !== i)
      });
    }
  };

  addValidationError = i => {
    if (!this.state.validationErrors.includes(i)) {
      this.setState(prevState => ({
        validationErrors: [...prevState.validationErrors, i]
      }));
    }
  };

  isValid = () => {
    const { username, password, password2 } = this.state;
    let valid = true;
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === ""
    ) {
      this.addValidationError(0);
      valid = false;
    } else {
      this.removeValidationError(0);
    }
    if (username.length < 3) {
      this.addValidationError(1);
      valid = false;
    } else {
      this.removeValidationError(1);
    }
    if (username.length > 10) {
      this.addValidationError(2);
      valid = false;
    } else {
      this.removeValidationError(2);
    }
    if (password.length < 3) {
      this.addValidationError(3);
      valid = false;
    } else {
      this.removeValidationError(3);
    }
    if (password !== password2) {
      this.addValidationError(4);
      valid = false;
    } else {
      this.removeValidationError(4);
    }
    return valid;
  };

  isConversationValid = () => {
    const { conversationName, conversationDescription } = this.state;
    let valid = true;
    if (conversationName.trim() === "" || conversationName.length < 3) {
      this.addValidationError(6);
      valid = false;
    } else {
      this.removeValidationError(6);
    }
    if (conversationName.length > 20) {
      this.addValidationError(7);
      valid = false;
    } else {
      this.removeValidationError(7);
    }
    if (conversationDescription.length > 20) {
      this.addValidationError(8);
      valid = false;
    } else {
      this.removeValidationError(8);
    }
    return valid;
  };

  handleSubmit = () => {
    if (this.isValid()) {
      const { username, password, password2 } = this.state;
      const user = {
        username,
        password,
        password2
      };
      axios
        .post("/register", user)
        .then(res => {
          if (res.data.errors) {
            const { errors } = res.data;
            this.setState({
              validationErrors: errors
            });
          } else {
            this.setState({
              username: "",
              password: "",
              password2: "",
              validationErrors: [],
              showRegisterSuccessMessage: true
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  handleLogin = () => {
    const { loginPassword, loginUsername } = this.state;
    if (loginPassword.trim() !== "" && loginUsername.trim() !== "") {
      const user = {
        loginUsername,
        loginPassword
      };
      axios
        .post("/login", user)
        .then(res => {
          if (res.data.user) {
            this.setState({
              authenticatedUser: res.data.user
            });
            this.getConversationList();
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.setState({
              showLoginFailedMessage: true
            });
          }
        });
      this.setState({
        loginPassword: "",
        loginUsername: "",
        validationErrors: [],
        username: "",
        password: "",
        password2: ""
      });
    }
  };

  handleLogout = () => {
    axios.get("/logout").then(res => {
      this.setState({
        authenticatedUser: res.data.user,
        conversationList: []
      });
    });
  };

  whichSnackbar = () => {
    const { showLoginFailedMessage, showRegisterSuccessMessage } = this.state;
    if (!showLoginFailedMessage && !showRegisterSuccessMessage) {
      return null;
    }
    return showLoginFailedMessage ? "error" : "success";
  };

  handleConverstaionDialog = () => {
    const { conversationCreateDialogStatus } = this.state;
    this.setState({
      conversationCreateDialogStatus: !conversationCreateDialogStatus,
      conversationDescription: "",
      conversationName: "",
      validationErrors: [],
      conversationJoinStatus: ""
    });
  };

  handleConverstaionJoinDialog = () => {
    const { conversationJoinDialogStatus } = this.state;
    this.setState({
      conversationJoinDialogStatus: !conversationJoinDialogStatus,
      conversationJoinName: "",
      conversationJoinStatus: ""
    });
  };

  handleConverstaionCreate = () => {
    const { conversationName, conversationDescription } = this.state;
    if (this.isConversationValid()) {
      const conversation = {
        conversationName,
        conversationDescription
      };
      axios
        .post("/createConversation", conversation)
        .then(res => {
          if (res.data.conversationCreated) {
            this.getConversationList();
            this.setState({
              conversationCreateDialogStatus: false,
              conversationDescription: "",
              conversationName: "",
              validationErrors: []
            });
          } else {
            if (res.data.error.conversationExists) {
              this.setState({
                validationErrors: [9]
              });
            } else {
              console.log(res.data.error);
            }
          }
        })
        .catch(e => console.log(e));
    }
  };

  handleConverstaionJoin = () => {
    const { conversationJoinName } = this.state;
    const conversation = {
      conversationJoinName
    };
    axios
      .post("/joinConversation", conversation)
      .then(({ data: { status } }) => {
        this.setState({
          conversationJoinStatus: status,
          conversationJoinDialogStatus: false,
          conversationJoinName: "",
          conversationInfoDialog: true
        });
      });
  };

  handleConversationJoinInfoDialogStatus = () => {
    const { conversationInfoDialog } = this.state;
    this.setState({
      conversationInfoDialog: !conversationInfoDialog
    });
  };

  getConversationList = () => {
    this.setState({
      conversationList: -1
    });
    setTimeout(() => {
      axios.get("/getConversationList").then(res => {
        const { conversations } = res.data;
        this.setState({
          conversationList: conversations
        });
      });
    }, 1000);
  };

  handleDeleteConfirmation = id => {
    axios
      .post("/deleteConversation", {
        id
      })
      .then(({ data: { deleted } }) =>
        deleted ? this.getConversationList() : null
      )
      .catch(err => console.log(err));
  };

  render() {
    const { authenticatedUser } = this.state;
    return (
      <>
        {authenticatedUser === -1 ? null : (
          <Provider
            value={{
              errors,
              conversationJoinMessages,
              ...this.state,
              onChange: this.handleChange,
              onClick: this.handleSubmit,
              handleMessage: this.handleMessage,
              onLogin: this.handleLogin,
              handleLogout: this.handleLogout,
              whichSnackbar: this.whichSnackbar,
              handleConverstaionDialog: this.handleConverstaionDialog,
              handleConverstaionCreate: this.handleConverstaionCreate,
              getConversationList: this.getConversationList,
              handleDeleteConfirmation: this.handleDeleteConfirmation,
              handleConverstaionJoinDialog: this.handleConverstaionJoinDialog,
              handleConverstaionJoin: this.handleConverstaionJoin,
              handleConversationJoinInfoDialogStatus: this
                .handleConversationJoinInfoDialogStatus
            }}
          >
            <ThemeProvider theme={theme}>
              <Header />
              <Container
                maxWidth={"lg"}
                style={{
                  flexGrow: "1",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Switch>
                  <HomeRoute path="/" exact component={Home} />
                  <DashboardRoute path="/dashboard" component={Dashboard} />
                  <Route path="/chat" component={Chat} />
                  <Route component={notFound} />
                </Switch>
              </Container>
            </ThemeProvider>
          </Provider>
        )}
      </>
    );
  }
}

export default App;
