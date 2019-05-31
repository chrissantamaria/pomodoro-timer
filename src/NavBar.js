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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
    paddingTop: 20,
    width: 200
  }
}));

function NavBar(props) {
  const classes = useStyles();

  const { email } = props.user;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [drawer, setDrawer] = useState(false);

  function handleLogOut() {
    handleClose();
    signOut().catch(e => console.error("Sign out error:", e));
  }

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
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setDrawer(false)}
          onKeyDown={() => setDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => props.history.push("/")}>
              <ListItemIcon>{<TimerIcon />}</ListItemIcon>
              <ListItemText primary="Timer" />
            </ListItem>
            <ListItem button onClick={() => props.history.push("/log")}>
              <ListItemIcon>{<ListIcon />}</ListItemIcon>
              <ListItemText primary="Session logs" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default withRouter(NavBar);
