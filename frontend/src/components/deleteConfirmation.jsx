import React, { useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Consumer } from "../context";

const Delete = ({ name, id }) => {
  const [open, setOpen] = useState(false);
  const [confirmationName, handleChange] = useState("");
  const [error, setError] = useState(false);
  return (
    <Consumer>
      {({ handleDeleteConfirmation }) => (
        <>
          {open ? (
            <>
              <TextField
                placeholder="Type conversation name"
                onChange={e => handleChange(e.target.value)}
                error={error}
                autoFocus
              />
              <IconButton
                edge="end"
                onClick={() => {
                  if (confirmationName === name) {
                    handleDeleteConfirmation(id);
                    handleChange("");
                    setOpen(!open);
                    setError(false);
                  } else {
                    setError(true);
                  }
                }}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => {
                  setOpen(!open);
                  handleChange("");
                  setError(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={() => {
                setOpen(!open);
                handleChange("");
                setError(false);
              }}
              edge="end"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </>
      )}
    </Consumer>
  );
};

export default Delete;
