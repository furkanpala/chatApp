import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Box,
  Typography
} from "@material-ui/core";
import { Consumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import ConversationCreateDialog from "./conversationCreateDialog";
import ConversationJoinDialog from "./conversationJoinDialog";
import ConversationJoinInfoDialog from "./conversationJoinStatusDialog";
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
  progress: {
    margin: theme.spacing(4)
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly"
  }
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ authenticatedUser, conversationList }) => (
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
            <Box>
              <CircularProgress
                size={50}
                className={classes.progress}
                color="secondary"
              />
            </Box>
          ) : conversationList.length === 0 ? (
            <Typography variant="h4">
              You do not have any conversations
            </Typography>
          ) : (
            <List component="nav">
              {conversationList.map(({ name, _id, ...rest }) => {
                return (
                  <ListItem key={_id} button divider>
                    <Link
                      to={{
                        pathname: "/chat",
                        state: {
                          activeConversation: {
                            ...rest
                          }
                        }
                      }}
                    >
                      <ListItemText primary={name} />
                      <ListItemSecondaryAction>
                        <Delete name={name} id={_id} />
                      </ListItemSecondaryAction>
                    </Link>
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
