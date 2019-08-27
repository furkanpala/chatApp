import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import { Consumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  }
});

const Header = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ authenticatedUser, handleLogout }) => (
        <AppBar position="static" color="default">
          <Toolbar>
            <Box className={classes.title}>
              <Typography
                variant="h6"
                color="inherit"
                style={{ marginRight: 2 }}
              >
                What's Up
              </Typography>
              <ChatIcon />
            </Box>
            {authenticatedUser ? (
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="secondary"
              >
                Logout
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
      )}
    </Consumer>
  );
};

export default Header;
