import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

import React, { forwardRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomDialog({
  dialogOpen,
  dialogTitle,
  dialogMessage,
  dialogCancelButton,
  dialogCancelButtonAction,
  dialogConfirmButton,
  dialogConfirmButtonAction,
  dialogCloseAction,
}) {
  return (
    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={dialogCloseAction}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogCancelButtonAction}>{dialogCancelButton}</Button>
        <Button onClick={dialogConfirmButtonAction}>
          {dialogConfirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
