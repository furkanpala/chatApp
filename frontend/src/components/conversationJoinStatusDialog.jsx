import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from "@material-ui/core";
import { Consumer } from "../context";

const ConversationJoinInfoDialog = () => {
  return (
    <Consumer>
      {({
        conversationJoinStatus,
        conversationInfoDialog,
        handleConversationJoinInfoDialogStatus,
        conversationJoinMessages
      }) => (
        <Dialog
          open={conversationInfoDialog}
          onClose={handleConversationJoinInfoDialogStatus}
        >
          <DialogContent>
            <Typography variant="body1">
              {conversationJoinStatus === -2
                ? conversationJoinMessages[0]
                : conversationJoinStatus === 2
                ? conversationJoinMessages[1]
                : conversationJoinStatus === 1
                ? conversationJoinMessages[2]
                : conversationJoinStatus === 0
                ? conversationJoinMessages[3]
                : conversationJoinMessages[4]}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConversationJoinInfoDialogStatus}
              color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Consumer>
  );
};

export default ConversationJoinInfoDialog;
