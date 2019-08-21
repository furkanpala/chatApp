import React, { useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Consumer } from "../context";

const Delete = ({ name, id }) => {
  const [open, setOpen] = useState(false);
  const [confirmationName, onChange] = useState("");
  const [error, setError] = useState(false);
  return (
    <Consumer>
      {({ handleDeleteConfirmation }) => (
        <>
          {open ? (
            <>
              <TextField
                placeholder="Type conversation name"
                onChange={e => onChange(e.target.value)}
                error={error}
                autoFocus
              />
              <IconButton
                edge="end"
                onClick={() => {
                  if (confirmationName === name) {
                    handleDeleteConfirmation(id);
                    onChange("");
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
                  onChange("");
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
                onChange("");
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
