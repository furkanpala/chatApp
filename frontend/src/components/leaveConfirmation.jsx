import React, { useState } from "react";
import { TextField, IconButton, Tooltip, Zoom } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Consumer } from "../context";

const Delete = ({ name, id }) => {
  const [open, setOpen] = useState(false);
  const [confirmationName, handleChange] = useState("");
  const [error, setError] = useState(false);
  return (
    <Consumer>
      {({ handleLeaveConfirmation }) => (
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
                    handleLeaveConfirmation(id);
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
            <Tooltip title="Leave" placement="left" TransitionComponent={Zoom}>
              <IconButton
                onClick={() => {
                  setOpen(!open);
                  handleChange("");
                  setError(false);
                }}
                edge="end"
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Consumer>
  );
};

export default Delete;
