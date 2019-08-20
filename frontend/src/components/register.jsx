import React from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { Consumer } from "../context";
import SuccessSnackbar from "./snackbar";

const RegisterForm = () => {
  return (
    <Consumer>
      {({
        username,
        password,
        password2,
        validationErrors,
        showRegisterSuccessMessage,
        showLoginFailedMessage,
        whichSnackbar,
        onChange,
        onClick,
        handleMessage,
        errors
      }) => (
        <>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            autoComplete="off"
          >
            {validationErrors.includes(0) ? (
              <Typography variant="caption" color="error" align="center">
                {errors[0]}
              </Typography>
            ) : null}
            <TextField
              label="Username"
              name="username"
              margin="dense"
              variant="outlined"
              onChange={onChange}
              value={username}
              helperText={
                validationErrors.includes(0)
                  ? null
                  : validationErrors.includes(1)
                  ? errors[1]
                  : validationErrors.includes(2)
                  ? errors[2]
                  : validationErrors.includes(5)
                  ? errors[5]
                  : null
              }
              error={
                validationErrors.includes(0)
                  ? false
                  : validationErrors.includes(1)
                  ? true
                  : validationErrors.includes(2)
                  ? true
                  : validationErrors.includes(5)
                  ? true
                  : false
              }
            />
            <TextField
              label="Password"
              name="password"
              margin="dense"
              variant="outlined"
              onChange={onChange}
              value={password}
              type="password"
              helperText={
                validationErrors.includes(0)
                  ? null
                  : validationErrors.includes(3)
                  ? errors[3]
                  : null
              }
              error={
                validationErrors.includes(0)
                  ? false
                  : validationErrors.includes(3)
                  ? true
                  : false
              }
            />
            <TextField
              label="Confirm Password"
              name="password2"
              margin="dense"
              variant="outlined"
              onChange={onChange}
              value={password2}
              type="password"
              helperText={
                validationErrors.includes(0)
                  ? null
                  : validationErrors.includes(4)
                  ? errors[4]
                  : null
              }
              error={
                validationErrors.includes(0)
                  ? false
                  : validationErrors.includes(4)
                  ? true
                  : false
              }
            />
            <Button onClick={onClick} variant="contained">
              Register
            </Button>
          </form>
          <SuccessSnackbar
            handleMessage={handleMessage}
            open={showRegisterSuccessMessage || showLoginFailedMessage}
            type={whichSnackbar()}
          />
        </>
      )}
    </Consumer>
  );
};

export default RegisterForm;
