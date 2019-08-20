import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Consumer } from "../context";

const LoginForm = () => {
  return (
    <Consumer>
      {({ loginUsername, loginPassword, onChange, onLogin }) => (
        <form
          autoComplete="off"
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <TextField
            label="Username"
            name="loginUsername"
            margin="dense"
            variant="outlined"
            style={{ flexGrow: 1 }}
            onChange={onChange}
            value={loginUsername}
          />
          <TextField
            label="Password"
            name="loginPassword"
            margin="dense"
            variant="outlined"
            style={{ flexGrow: 1 }}
            onChange={onChange}
            value={loginPassword}
            type="password"
          />
          <Button onClick={onLogin} variant="contained">
            Login
          </Button>
        </form>
      )}
    </Consumer>
  );
};

export default LoginForm;
