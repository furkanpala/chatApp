import React from "react";
import { TextField } from "@material-ui/core";

const Type = () => {
  return (
    <TextField
      placeholder="Your Message"
      fullWidth
      variant="outlined"
      multiline
      rowsMax="6"
      margin="normal"
    />
  );
};

export default Type;
