import React from "react";
import { Box } from "@material-ui/core";
import ChatBubble from "./chatBubble";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    display: "flex",
    flexDirection: "column",
    height: 500,
    overflowY: "scroll",
    flexGrow: 1
  }
});

const Messages = () => {
  const classes = useStyles();
  return (
    <Box className={classes.paper}>
      <ChatBubble />
      <ChatBubble own />
      <ChatBubble />
      <ChatBubble />
      <ChatBubble />
    </Box>
  );
};

export default Messages;
