import React from "react";
import { Snackbar, IconButton, SnackbarContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { green } from "@material-ui/core/colors";

const SuccessSnackbar = props => {
  const { handleMessage, open, type } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleMessage}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
    >
      <SnackbarContent
        style={
          type === "success"
            ? { backgroundColor: green[600] }
            : { backgroundColor: "#f44336" } // Error color
        }
        message={
          <span>
            {type === "success"
              ? "Registered Successfully!"
              : "Username or password did not matched"}
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={handleMessage}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default SuccessSnackbar;
