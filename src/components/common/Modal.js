import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({closeModal, onDelete, open, children}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {children}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onDelete} color="primary">
                        예
                    </Button>
                    <Button onClick={closeModal} color="primary" autoFocus>
                        아니요
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Modal;