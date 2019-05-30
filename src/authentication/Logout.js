import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Redirect } from "react-router-dom"


export default function Logout(props) {
    const [shouldRoute, setShouldRoute] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [shouldLogout, setShouldLogout] = useState(false);

    const currentPage = props.currentPage;
    let route;
    let label;
    if (currentPage === "timer") {
        route = "/log";
        label = "Go to log";
    } else {
        route = "/";
        label = "Go to timer";
    }

    const handleClick = (event) => {
        // dropdown the menu
        setAnchorEl(event.currentTarget);

    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        setShouldLogout(true);
    }

    const handleRedirect = () => {
        setShouldRoute(true);
    }

    if (shouldRoute) {
        return <Redirect to={route} />
    }
    if (shouldLogout){
        localStorage.clear();
        sessionStorage.clear();
        return <Redirect to="/signIn" />
    }

    return (
        <div>
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleRedirect}>{label}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}