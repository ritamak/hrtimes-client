import React from "react";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import "./Navbar.css";

import { AppBar, Toolbar, Button, IconButton, Avatar } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";

function Navbar(props) {
  const { user, onLogOut } = props;
  return (
    <AppBar position="static" style={{ background: "#000000" }}>
      <Toolbar>
        <IconButton edge="start">
          <Link to={"/profile"} style={{ marginRight: "0px" }}>
            <Button>
              <Avatar alt="profile" src={user.image} />
            </Button>
          </Link>
        </IconButton>
        <Link to={`/create`} style={{ color: "#ffffff" }}>
          <CreateIcon />
        </Link>
        <Link to={`/${user._id}/edit`} style={{ color: "#ffffff" }}>
          <MoreVertOutlinedIcon />
        </Link>
        <Button onClick={onLogOut} color="inherit">
          <ExitToApp />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
