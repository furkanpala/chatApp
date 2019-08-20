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

const ConversationCreateDialog = () => {
  return (
    <Consumer>
      {({
        conversationCreateDialogStatus,
        handleConverstaionDialog,
        onChange,
        handleConverstaionCrate,
        validationErrors,
        errors,
        getConversationList
      }) => (
        <>
          {/* TODO: SİL */}
          <Button
            variant="contained"
            color="primary"
            onClick={getConversationList}
          >
            Get All Conversations
          </Button>
          {/* TODO: SİL */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleConverstaionDialog}
          >
            Start a New Conversation
          </Button>
          <Dialog
            open={conversationCreateDialogStatus}
            onClose={handleConverstaionDialog}
          >
            <DialogTitle id="form-dialog-title">New Conversation</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                name="conversationName"
                fullWidth
                onChange={onChange}
                autoComplete="off"
                helperText={
                  validationErrors.includes(6)
                    ? errors[6]
                    : validationErrors.includes(7)
                    ? errors[7]
                    : null
                }
                error={
                  validationErrors.includes(6)
                    ? true
                    : validationErrors.includes(7)
                    ? true
                    : false
                }
              />
              <TextField
                margin="dense"
                label="Description (optional)"
                type="text"
                name="conversationDescription"
                fullWidth
                multiline
                rowsMax="2"
                onChange={onChange}
                autoComplete="off"
                helperText={validationErrors.includes(8) ? errors[8] : null}
                error={validationErrors.includes(8) ? true : false}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConverstaionDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConverstaionCrate} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Consumer>
  );
};

export default ConversationCreateDialog;
