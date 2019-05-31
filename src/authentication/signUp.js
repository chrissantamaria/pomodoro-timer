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
import { signUp } from "../firebase/firebase.js";

import useStyles from "./AuthStyles";

function SignUp(props) {
  const classes = useStyles();
  const { history } = props;

  const [email, setEmail] = useState({ value: "", warning: false });
  const [pwd, setPwd] = useState({ value: "", warning: false });
  const [pwdConfirm, setPwdConfirm] = useState({ value: "", warning: false });
  const [rememberMe, setRememberMe] = useState(false);

  const [warning, setWarning] = useState(null);

  const accumulateEmail = event => {
    const warning = !event.target.value;
    setEmail({ warning, value: event.target.value });
  };
  const accumulatePwd = event => {
    const warning = !event.target.value;
    setPwd({ warning, value: event.target.value });
  };
  const accumulatePwdConfirm = event => {
    const warning = !event.target.value || event.target.value !== pwd.value;
    setPwdConfirm({ warning, value: event.target.value });
  };
  const handleRemember = () => setRememberMe(!rememberMe);

  const onSignUp = () => {
    if (!email.value || !pwd.value) {
      setWarning("Please complete all required fields");
    } else if (!email.warning && !pwd.warning && !pwdConfirm.warning) {
      signUp({ email: email.value, pwd: pwd.value, rememberMe })
        .then(() => {
          localStorage.setItem("firstTimer", "true");
          history.push("/");
        })
        .catch(err => {
          console.error("Failed to create new user:", err);
          setWarning(err.message);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            onChange={accumulateEmail}
            error={email.warning}
            autoFocus
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            onChange={accumulatePwd}
            error={pwd.warning}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            onChange={accumulatePwdConfirm}
            error={pwdConfirm.warning}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
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
            onClick={onSignUp}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link className={classes.link} to="/signIn">
                {"Already have an account? Sign In"}
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

export default withRouter(SignUp);
