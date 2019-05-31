import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import TimerIcon from "@material-ui/icons/Timer";
import ListIcon from "@material-ui/icons/List";

import { withRouter } from "react-router-dom";
import { signOut } from "./firebase/firebase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  email: {
    fontSize: 16
  },
  list: {
    width: 200
  },
  listFlex: {
    height: "100vh",
    paddingTop: 20
  },
  last: {
    marginTop: "auto"
  }
}));

function NavBar(props) {
  const classes = useStyles();

  const { email } = props.user;
  const { history, handleThemeChange } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [drawer, setDrawer] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);
  const handleThemeSwitch = e => {
    setDarkTheme(e.target.checked);
    handleThemeChange(e.target.checked ? "dark" : "light");
  };

  function handleLogOut() {
    handleClose();
    signOut().catch(e => console.error("Sign out error:", e));
  }

  const handleLoadTimer = () => {
    history.push("/");
    setDrawer(false);
  };
  const handleLoadLog = () => {
    history.push("/log");
    setDrawer(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Pomodoro Timer
            </Typography>
            <div>
              <Box display="flex" flexDirection="row">
                <p className={classes.email}>{email}</p>
                <IconButton
                  aria-owns={anchorEl ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  size="small"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={!!anchorEl}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <div className={classes.list} role="presentation">
          <Box
            className={classes.listFlex}
            display="flex"
            flexDirection="column"
          >
            <ListItem button onClick={handleLoadTimer}>
              <ListItemIcon>
                <TimerIcon />
              </ListItemIcon>
              <ListItemText primary="Timer" />
            </ListItem>
            <ListItem button onClick={handleLoadLog}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Session logs" />
            </ListItem>
            <ListItem className={classes.last}>
              <ListItemText primary="Dark theme" />
              <Switch
                color="primary"
                checked={darkTheme}
                onClick={handleThemeSwitch}
              />
            </ListItem>
          </Box>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default withRouter(NavBar);
