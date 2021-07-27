import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
export const ModalWindow = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>PETAMPのつかいかた</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1}>
            {[...new Array(5)]
              .map(
                () =>
                  `東京はとっても暑いと聞いていますなぜならとっても暑いからです`
              )
              .join("\n")}
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
