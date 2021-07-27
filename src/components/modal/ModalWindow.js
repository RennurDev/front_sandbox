import { useState } from 'react';
import { Button, Dialog } from '@material-ui/core';

export const ModalWindow = () => {
  const [open, setOpen] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <p>当アプリはいろいろ未完成ですが遊んでください</p>
            </Dialog>
        </div>
    );    
}
