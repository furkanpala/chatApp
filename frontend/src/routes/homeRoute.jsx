import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../context";

const HomeRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {({ authenticatedUser }) => (
        <Route
          {...rest}
          render={props =>
            !authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
      )}
    </Consumer>
  );
};

export default HomeRoute;
