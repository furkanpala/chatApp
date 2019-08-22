import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  own: {
    alignSelf: "flex-end",
    backgroundColor: "blue"
  },
  other: {
    alignSelf: "flex-start",
    backgroundColor: "red"
  },
  bubble: {
    width: "50%",
    margin: theme.spacing(2),
    flex: "none"
  }
}));

const ChatBubble = ({ own }) => {
  const classes = useStyles();
  return (
    <Card className={`${own ? classes.own : classes.other} ${classes.bubble}`}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be nev lent
        </Typography>
        <Typography color="textSecondary">adjective</Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ChatBubble;
