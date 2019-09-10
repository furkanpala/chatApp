import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  DialogTitle,
  Divider,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Consumer } from "../context";
import PersonIcon from "@material-ui/icons/Person";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

const ConversationSettingsDialog = () => {
  return (
    <Consumer>
      {({
        handleConversationSettingsDialog,
        conversationSettingsDialogStatus,
        activeConversation,
        newUser,
        authenticatedUser
      }) => (
        <Dialog
          open={conversationSettingsDialogStatus}
          onClose={handleConversationSettingsDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Members</DialogTitle>
          {activeConversation === null ? null : activeConversation ===
            -1 ? null : (
            <DialogContent>
              <>
                {activeConversation.admin !==
                authenticatedUser._id ? null : activeConversation
                    .memberCandidates.length === 0 ? null : (
                  <>
                    <List component="nav">
                      {activeConversation.memberCandidates.map(
                        ({ _id, username }) => (
                          <ListItem disableGutters key={_id}>
                            <ListItemIcon>
                              <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={username} />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                onClick={newUser.bind(
                                  this,
                                  _id,
                                  activeConversation._id,
                                  true
                                )}
                              >
                                <DoneIcon />
                              </IconButton>
                              <IconButton
                                edge="end"
                                onClick={newUser.bind(
                                  this,
                                  _id,
                                  activeConversation._id,
                                  false
                                )}
                              >
                                <CloseIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        )
                      )}
                    </List>
                    <Divider />
                  </>
                )}
              </>
              <List component="nav">
                {activeConversation.members.map(({ username, _id }) => (
                  <ListItem disableGutters key={_id}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={username} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          )}
          <DialogActions>
            <Button color="primary" onClick={handleConversationSettingsDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Consumer>
  );
};

export default ConversationSettingsDialog;
