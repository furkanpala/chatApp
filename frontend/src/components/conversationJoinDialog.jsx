import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { Consumer } from "../context";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const ConversationJoinDialog = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({
        onChange,
        handleConverstaionJoinDialog,
        conversationJoinDialogStatus,
        handleConverstaionJoin
      }) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConverstaionJoinDialog}
          >
            Join a Conversation
            <SendIcon className={classes.rightIcon} />
          </Button>
          <Dialog
            open={conversationJoinDialogStatus}
            onClose={handleConverstaionJoinDialog}
          >
            <DialogTitle id="form-dialog-title">
              Join a Conversation
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                name="conversationJoinName"
                fullWidth
                onChange={onChange}
                autoComplete="off"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConverstaionJoinDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConverstaionJoin} color="primary">
                Join
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Consumer>
  );
};

export default ConversationJoinDialog;
