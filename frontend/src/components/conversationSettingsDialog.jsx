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
  Divider
} from "@material-ui/core";
import { Consumer } from "../context";
import PersonIcon from "@material-ui/icons/Person";

const ConversationSettingsDialog = () => {
  return (
    <Consumer>
      {({
        handleConversationSettingsDialog,
        conversationSettingsDialogStatus
      }) => (
        <Dialog
          open={conversationSettingsDialogStatus}
          onClose={handleConversationSettingsDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Members</DialogTitle>
          <DialogContent>
            <List component="nav">
              <ListItem disableGutters>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Merhaba" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav">
              <ListItem disableGutters>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
            </List>
          </DialogContent>
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
