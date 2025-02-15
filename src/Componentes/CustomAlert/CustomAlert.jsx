import { Alert, Grid2 as Grid, Snackbar } from "@mui/material";

export default function CustomAlert({
  alertOpen,
  timeoutDuration,
  alertMessage,
  alertSeverity,
  alertVariant,
  alertVertical,
  alertHorizontal,
  closeAlert,
}) {
  return (
    <Snackbar
      sx={{ minWidth: "100%" }}
      open={alertOpen}
      autoHideDuration={timeoutDuration}
      onClose={closeAlert}
      anchorOrigin={{ vertical: alertVertical, horizontal: alertHorizontal }}
    >
      <Alert variant={alertVariant} severity={alertSeverity}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
