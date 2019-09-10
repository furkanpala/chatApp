import React, { useRef, useEffect } from "react";
import { Box } from "@material-ui/core";
import ChatBubble from "./chatBubble";
import { makeStyles } from "@material-ui/core/styles";
import { Consumer } from "../context";

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
  const endMessagesRef = useRef();
  useEffect(() => {
    if (endMessagesRef.current) {
      endMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  // Scroll to bottom solution from https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react and https://stackoverflow.com/questions/56086130/reactjs-how-to-scroll-to-an-element-with-hooks-functions

  return (
    <Consumer>
      {({ activeConversation, authenticatedUser, calculateTimesAgo }) => (
        <>
          {activeConversation === null ? null : activeConversation ===
            -1 ? null : (
            <Box className={classes.paper}>
              {activeConversation.messages.map(message => (
                <ChatBubble
                  key={message._id}
                  content={message.content}
                  own={message.sentBy._id === authenticatedUser._id}
                  username={message.sentBy.username}
                  calcAgo={calculateTimesAgo}
                  createdAt={message.createdAt}
                />
              ))}
              <div ref={endMessagesRef}></div>
            </Box>
          )}
        </>
      )}
    </Consumer>
  );
};

export default Messages;
