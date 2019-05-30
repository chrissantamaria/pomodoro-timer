import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../firebase/firebase";

export default function Instructions(props) {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        localStorage.clear();
    }

    if (localStorage.getItem("firstTimer") === "true" && open === false){
        setOpen(true);
    }
    return (
    <React.Fragment>
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
        <DialogTitle>Instructions</DialogTitle>
        <DialogContent>
            <DialogContentText>1. Choose between a work or a break session</DialogContentText>
            <DialogContentText>2. Use the buttons on the timer to adjust the session length</DialogContentText>
            <DialogContentText>3. Start the session timer and keep in mind options to pause or reset the timer</DialogContentText>
            <DialogContentText>4. Log your activity and submit to save your history to the logs page</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}