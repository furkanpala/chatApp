import React from "react";
import Messages from "./messages";
import Type from "./type";

const Chat = ({
  location: {
    state: { activeConversation }
  }
}) => {
  console.log(activeConversation);
  return (
    <>
      <h1>{activeConversation.name}</h1>
      <Messages />
      <Type
        members={activeConversation.members}
        memberCandidates={activeConversation.memberCandidates}
      />
    </>
  );
};

export default Chat;
