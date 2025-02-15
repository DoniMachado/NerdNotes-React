import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Rating,
} from "@mui/material";
import React, { forwardRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RatingDialog({
  id,
  type,
  ratingDialogOpen,
  ratingDialogTitle,
  rating,
  ratingDialogCancelButton,
  ratingDialogCancelButtonAction,
  ratingDialogConfirmButton,
  ratingDialogConfirmButtonAction,
  ratingDialogCloseAction,
}) {
  const [tempRating, setTempRating] = useState(rating);

  return (
    <Dialog
      open={ratingDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={ratingDialogCloseAction}
    >
      <DialogTitle>{ratingDialogTitle}</DialogTitle>
      <DialogContent>
        <Rating
          value={tempRating}
          precision={0.5}
          max={10}
          size="large"
          onChange={(event, newValue) => {
            setTempRating(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ratingDialogCancelButtonAction}>
          {ratingDialogCancelButton}
        </Button>
        <Button
          onClick={() => ratingDialogConfirmButtonAction(tempRating, rating)}
          disabled={!rating && !tempRating}
        >
          {ratingDialogConfirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RatingDialog;
