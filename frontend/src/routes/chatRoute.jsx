import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../context";

const ChatRoute = ({ component: Component, location: { state }, ...rest }) => {
  return (
    <Consumer>
      {({ authenticatedUser, goToConversation }) => (
        <Route
          {...rest}
          render={props =>
            authenticatedUser ? (
              state ? (
                <Component {...props} goToConversation={goToConversation} />
              ) : (
                <Redirect to="/dashboard" />
              )
            ) : (
              <Redirect to="/" />
            )
          }
        />
      )}
    </Consumer>
  );
};

export default ChatRoute;
