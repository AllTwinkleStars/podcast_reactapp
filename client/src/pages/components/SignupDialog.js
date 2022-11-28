import React from "react";
import Dialog from "@material-ui/core/Dialog";
import SignupForm from "./SignupForm";

const SignupDialog = ({ open, handleClose, setUser}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <SignupForm handleClose={handleClose} setUser={setUser}/>
     </Dialog>
  );
};

export default SignupDialog;
