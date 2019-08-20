import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import RegisterForm from "./register";
import LoginForm from "./login";

const useStyles = makeStyles(theme => ({
  introduction: {
    marginTop: theme.spacing(2),
    fontWeight: 500
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h3"
        className={classes.introduction}
        color="primary"
        align="center"
        gutterBottom
      >
        Login or Register to Continue
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
