import React, { Component } from "react";
import Messages from "./messages";
import Type from "./type";
import LoadingIcon from "./loadingIcon";
import { Consumer } from "../context";
import io from "socket.io-client";

class Chat extends Component {
  constructor() {
    super();
    this.socket = io("http://localhost:5000");
  }
  componentDidMount() {
    const { selectedConversation } = this.props.location.state;
    const { goToConversation, updateConversation } = this.props;
    goToConversation(selectedConversation.id);
    this.socket.on("updatedConversation", conversation =>
      updateConversation(conversation)
    );
  }
  componentWillUnmount() {
    const { clearActiveConversation } = this.props;
    this.socket.disconnect();
    clearActiveConversation();
  }
  render() {
    return (
      <Consumer>
        {({ activeConversation }) => (
          <>
            {activeConversation === -1 ? (
              <LoadingIcon page="chat" />
            ) : (
              <>
                <Messages />
                <Type socket={this.socket} />
              </>
            )}
          </>
        )}
      </Consumer>
    );
  }
}

export default Chat;
