import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

import { Link, withRouter } from "react-router-dom";
import { signIn } from "../firebase/firebase.js";

import useStyles from "./AuthStyles";

function SignIn(props) {
  const classes = useStyles();
  const { history } = props;

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [warning, setWarning] = useState(null);

  const accumulateEmail = event => {
    setEmail(event.target.value);
  };
  const accumulatePwd = event => {
    setPwd(event.target.value);
  };
  const handleRemember = () => setRememberMe(!rememberMe);

  const onSignIn = () => {
    signIn({ email, pwd, rememberMe })
      .then(() => {
        console.log("Successfully signed in");
        history.push("/");
      })
      .catch(err => {
        console.error("Failed to sign in:", err);
        setWarning(err.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            onChange={accumulateEmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            onChange={accumulatePwd}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={rememberMe}
                onChange={handleRemember}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link className={classes.link} to="/signUp">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={!!warning}
        autoHideDuration={5000}
        onClose={() => setWarning(null)}
        message={<span>{warning}</span>}
      />
    </Container>
  );
}

export default withRouter(SignIn);
