import React from "react";
import { Paper, List, ListItem, ListItemText } from "@material-ui/core";
import { Consumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import ConversationCreateDialog from "./conversationCreateDialog";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    height: "500px",
    marginTop: "10px",
    padding: "10px",
    textAlign: "center"
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ authenticatedUser, conversationList }) => (
        <Paper className={classes.paper}>
          <h1>Welcome {authenticatedUser.username}</h1>
          <ConversationCreateDialog />
          {conversationList === -1 ? (
            <h1>You do not have conversations</h1>
          ) : (
            <List component="nav">
              {conversationList.map(conversation => {
                return (
                  <ListItem key={conversation._id} button divider>
                    <ListItemText primary={conversation.name} />
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
