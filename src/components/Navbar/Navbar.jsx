import React from "react";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import "./Navbar.css";

import { AppBar, Toolbar, Button, IconButton, Avatar } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

function Navbar(props) {
  const { user, onLogOut } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start">
          <Link to={"/profile"}>
            <Button>
              <Avatar alt="profile" src={user.image} />
            </Button>
          </Link>
        </IconButton>
        <Link to={`/create`}>
          <Button>
            <CreateIcon />
            Create Article
          </Button>
        </Link>
        <Link to={`/${user._id}/edit`}>
          <Button>
            <i class="fas fa-user-edit fa-lg"></i>
            Edit Profile
          </Button>
        </Link>
        <Button onClick={onLogOut}>
          Logout
          <ExitToApp />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
