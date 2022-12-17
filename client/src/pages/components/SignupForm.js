import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import { Button, TextField, Typography } from "@material-ui/core";
import * as api from "../../api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
      textTransform: "none",
    },
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignupForm = ({ handleClose, setUser}) => {
  const classes = useStyles();
  const [userData, setUserData] = useState(initialState);

  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      const { data } = await api.signUp(userData);
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      console.log(data);
    } else {
      const { data } = await api.signIn(userData);
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      //localStorage.setItem("subscriptions", JSON.stringify({ ...data.subscriptions }));
      console.log(data);
    }
    setUser(JSON.parse(localStorage.getItem("profile"))?.userData)
    handleClose();
  };

  const switchMode = () => {
    setUserData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography component="h1" variant="h5">
        {isSignup ? "Sign up" : "Sign in"}
      </Typography>
      {isSignup && (
        <>
          <TextField
            label="First Name"
            variant="filled"
            required
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            variant="filled"
            required
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
        </>
      )}
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
      </div>

      <Button onClick={switchMode}>
        {isSignup
          ? "Already have an account? Sign in"
          : "Don't have an account? Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
