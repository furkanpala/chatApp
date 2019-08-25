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

const Type = ({ members, memberCandidates }) => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ handleConversationSettingsDialog }) => (
        <Box className={classes.type}>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleConversationSettingsDialog}
          >
            <MoreVertIcon />
          </Button>
          <TextField
            placeholder="Your Message"
            fullWidth
            variant="outlined"
            multiline
            rowsMax="6"
          />
          <Button color="primary" variant="outlined">
            <SendIcon />
          </Button>
          <ConversationSettingsDialog
            members={members}
            memberCandidates={memberCandidates}
          />
        </Box>
      )}
    </Consumer>
  );
};

export default Type;
