import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";

export default function ReturnDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Return the Book?</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Barcode'
                    fullWidth
                    defaultValue={props.barcode}
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={props.handleClose}>Cancel</Button>
                <Button
                    color='primary'
                    onClick={props.handleBorrow({
                        type: 1,
                        barcode: props.barcode,
                        state: 1
                    })}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}