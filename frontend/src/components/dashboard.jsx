import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Box
} from "@material-ui/core";
import { Consumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import ConversationCreateDialog from "./conversationCreateDialog";
import Delete from "./deleteConfirmation";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    height: "500px",
    marginTop: "10px",
    padding: "10px",
    textAlign: "center"
  },
  progress: {
    margin: theme.spacing(4)
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
            <Box>
              <CircularProgress
                size={50}
                className={classes.progress}
                color="secondary"
              />
            </Box>
          ) : conversationList.length === 0 ? (
            <h1>You do not have any conversations</h1>
          ) : (
            <List component="nav">
              {conversationList.map(({ name, _id }) => {
                return (
                  <ListItem key={_id} button divider>
                    <ListItemText primary={name} />
                    <ListItemSecondaryAction>
                      <Delete name={name} id={_id} />
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
