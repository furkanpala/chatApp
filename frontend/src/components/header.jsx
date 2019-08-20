import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Consumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ authenticatedUser, handleLogout }) => (
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Photos
            </Typography>
            {authenticatedUser ? (
              <Button onClick={handleLogout} color="inherit">
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
