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
  ownMessageArea: {
    borderColor: "#d0d0d0",
    backgroundColor: "#f0f0f0"
  },
  otherMessageArea: {
    borderColor: "#bbcfff8c",
    backgroundColor: "#f3f6ff"
  }
}));

const ChatBubble = ({ own }) => {
  const classes = useStyles();
  return (
    <Card className={`${own ? classes.own : classes.other} ${classes.bubble}`}>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <Box style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <IconButton style={{ padding: 0 }}>
              <Avatar>F</Avatar>
            </IconButton>
            <Typography color="textSecondary" style={{ marginLeft: 10 }}>
              fpala
            </Typography>
          </Box>
          <Typography color="textSecondary">2 days ago</Typography>
        </Box>
        <Box
          style={{
            marginTop: 10,
            padding: 10,
            borderStyle: "solid",
            borderRadius: 4
          }}
          className={own ? classes.ownMessageArea : classes.otherMessageArea}
        >
          asd
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatBubble;
