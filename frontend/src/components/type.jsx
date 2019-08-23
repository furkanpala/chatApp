import React from "react";
import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles({
  type: {
    display: "flex",
    marginTop: 8,
    marginBottom: 8
  }
});

const Type = () => {
  const classes = useStyles();
  return (
    <Box className={classes.type}>
      <Button color="primary" variant="outlined">
        <MoreVertIcon />
      </Button>
      <TextField
        placeholder="Your Message"
        fullWidth
        variant="outlined"
        multiline
        rowsMax="6"
      />
      <Button color="primary" variant="outlined">
        <SendIcon />
      </Button>
    </Box>
  );
};

export default Type;
