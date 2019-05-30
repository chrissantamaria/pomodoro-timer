import React, { useState } from "react";
import { signUp } from "../firebase/firebase.js";
import { Redirect } from "react-router-dom";
// material ui stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const accumulateEmail = event => {
    setEmail(event.target.value);
  };
  const accumulatePwd = event => {
    setPwd(event.target.value);
  };

  const onSignUp = () => {
    signUp({ email, pwd, rememberMe })
      .then(() => {
        setShouldRedirect(true);
      })
      .catch(err => {
        console.log("Failed to create new user:", err);
      });
  };

  const handleRemember = () => setRememberMe(!rememberMe);

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }
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
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={accumulateEmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={accumulatePwd}
            autoComplete="current-password"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signIn" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
