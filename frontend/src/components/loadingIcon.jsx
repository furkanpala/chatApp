import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  boxChat: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  boxDashboard: {
    marginTop: theme.spacing(4)
  }
}));

const LoadingIcon = ({ page }) => {
  const classes = useStyles();
  return (
    <Box className={page === "chat" ? classes.boxChat : classes.boxDashboard}>
      <CircularProgress
        size={50}
        className={classes.progress}
        color="secondary"
      />
    </Box>
  );
};

export default LoadingIcon;
