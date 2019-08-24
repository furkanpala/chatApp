import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar, IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  own: {
    alignSelf: "flex-end",
    backgroundColor: "#eaeaea"
  },
  other: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF3FF"
  },
  bubble: {
    width: "50%",
    margin: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: 0
    },
    flex: "none"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column"
  },
  messageArea: {
    marginTop: 10,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 4
  },
  ownMessageArea: {
    borderColor: "#d0d0d0",
    backgroundColor: "#f0f0f0"
  },
  otherMessageArea: {
    borderColor: "#bbcfff8c",
    backgroundColor: "#f3f6ff"
  },
  infoBox: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1
  },
  iconButton: {
    padding: 0
  },
  username: {
    marginLeft: 10,
    marginRight: 10
  },
  mobileInfoBox: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row-reverse"
    }
  },
  mobileInnerInfoBox: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 0,
      flexDirection: "row-reverse"
    }
  },
  mobileDate: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1
    }
  }
}));

const ChatBubble = ({ own }) => {
  const classes = useStyles();
  return (
    <Card className={`${own ? classes.own : classes.other} ${classes.bubble}`}>
      <CardContent className={classes.cardContent}>
        <Box
          className={`${classes.infoBox} ${own ? classes.mobileInfoBox : null}`}
        >
          <Box
            className={`${classes.infoBox} ${
              own ? classes.mobileInnerInfoBox : null
            }`}
          >
            <IconButton className={classes.iconButton}>
              <Avatar>F</Avatar>
            </IconButton>
            <Typography color="textSecondary" className={classes.username}>
              fpala
            </Typography>
          </Box>
          <Typography
            color="textSecondary"
            className={own ? classes.mobileDate : null}
          >
            2 days ago
          </Typography>
        </Box>
        <Box
          className={`${
            own ? classes.ownMessageArea : classes.otherMessageArea
          } ${classes.messageArea}`}
        >
          asd
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatBubble;
