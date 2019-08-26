import React, { Component } from "react";
import Messages from "./messages";
import Type from "./type";
import LoadingIcon from "./loadingIcon";
import { Consumer } from "../context";

class Chat extends Component {
  componentDidMount() {
    const { selectedConversation } = this.props.location.state;
    const { goToConversation } = this.props;
    goToConversation(selectedConversation.id);
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
                <Type />
              </>
            )}
          </>
        )}
      </Consumer>
    );
  }
}

export default Chat;
