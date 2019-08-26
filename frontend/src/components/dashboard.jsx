import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Typography
} from "@material-ui/core";
import { Consumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import ConversationCreateDialog from "./conversationCreateDialog";
import ConversationJoinDialog from "./conversationJoinDialog";
import ConversationJoinInfoDialog from "./conversationJoinStatusDialog";
import LoadingIcon from "./loadingIcon";
import Delete from "./deleteConfirmation";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    height: "500px",
    marginTop: "10px",
    padding: "10px",
    textAlign: "center"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly"
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ authenticatedUser, conversationList, goToConversation }) => (
        <Paper className={classes.paper}>
          <Typography variant="h4">
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
            <List component="nav">
              {conversationList.map(conversation => {
                return (
                  <ListItem
                    onClick={goToConversation.bind(this, conversation.id)}
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
                      <Delete name={conversation.name} id={conversation.id} />
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
