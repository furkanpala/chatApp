import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Typography,
  ListSubheader
} from "@material-ui/core";
import { Consumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import ConversationCreateDialog from "./conversationCreateDialog";
import ConversationJoinDialog from "./conversationJoinDialog";
import ConversationJoinInfoDialog from "./conversationJoinStatusDialog";
import LoadingIcon from "./loadingIcon";
import Leave from "./leaveConfirmation";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  "@global": {
    "::-webkit-scrollbar": {
      width: "0.5em"
    },
    "::-webkit-scrollbar-thumb": {
      height: 56,
      background: "inherit",
      borderRadius: 4
    }
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "auto"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      flexBasis: 100
    }
  },
  conversations: {
    overflowY: "auto",
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: "#cecece"
      }
    }
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ authenticatedUser, conversationList }) => (
        <Paper className={classes.paper} elevation={10}>
          <Typography variant="h4" gutterBottom>
            Welcome {authenticatedUser.username}
          </Typography>
          <Box className={classes.buttons}>
            <ConversationCreateDialog />
            <ConversationJoinDialog />
            <ConversationJoinInfoDialog />
          </Box>
          {conversationList === -1 ? (
            <LoadingIcon page="dashboard" />
          ) : conversationList.length === 0 ? (
            <Typography variant="h4">
              You do not have any conversations
            </Typography>
          ) : (
            <List component="nav" className={classes.conversations}>
              <ListSubheader disableSticky>My Conversations</ListSubheader>
              {conversationList.map(conversation => {
                return (
                  <ListItem
                    // onClick={goToConversation.bind(this, conversation.id)}
                    component={Link}
                    to={{
                      pathname: "/chat",
                      state: {
                        selectedConversation: {
                          ...conversation
                        }
                      }
                    }}
                    key={conversation.id}
                    button
                    divider
                  >
                    <ListItemText primary={conversation.name} />
                    <ListItemSecondaryAction>
                      <Leave name={conversation.name} id={conversation.id} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
      )}
    </Consumer>
  );
};

export default Dashboard;
