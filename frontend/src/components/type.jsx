import React from "react";
import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Consumer } from "../context";
import ConversationSettingsDialog from "./conversationSettingsDialog";

const useStyles = makeStyles({
  type: {
    display: "flex",
    marginTop: 8,
    marginBottom: 8
  }
});

const Type = ({ socket }) => {
  const classes = useStyles();
  return (
    <Consumer>
      {({
        handleConversationSettingsDialog,
        sendMessage,
        onChange,
        message
      }) => (
        <Box className={classes.type}>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleConversationSettingsDialog}
          >
            <MoreVertIcon />
          </Button>
          <TextField
            label={
              message.length === 199
                ? "1 character left"
                : `${200 - message.length} characters left`
            }
            name="message"
            fullWidth
            variant="outlined"
            multiline
            value={message}
            rowsMax="3"
            // Send on enter solution from https://github.com/mui-org/material-ui/issues/5393 #SuEric
            onKeyPress={e => {
              if (e.key === "Enter") {
                sendMessage(socket);
                e.preventDefault();
              }
            }}
            onChange={onChange}
          />
          <Button
            color="primary"
            variant="outlined"
            onClick={sendMessage.bind(this, socket)}
          >
            <SendIcon />
          </Button>
          <ConversationSettingsDialog />
        </Box>
      )}
    </Consumer>
  );
};

export default Type;
