import React from "react";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, Button, IconButton, Avatar } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Navbar(props) {
  const { user, onLogOut } = props;
  if (!user.image) {
    user.image = "/media/user.png";
  }

  return (
    <AppBar position="static" style={{ background: "#000000" }}>
      <Toolbar>
        <IconButton edge="start">
          <Link to={"/profile"}>
            <Button>
              <Avatar id="image" alt="profile" src={user.image} />
            </Button>
          </Link>
        </IconButton>
        <Link to={`/create`}>
          <Button className="navBarButtons">
            <CreateIcon />
            Create Article
          </Button>
        </Link>
        <Link to={`/${user._id}/edit`}>
          <Button className="navBarButtons">
            <i class="fas fa-user-edit fa-lg"></i>
            Edit Profile
          </Button>
        </Link>
        <Button className="navBarButtons" onClick={onLogOut}>
          Logout
          <ExitToApp />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

/*
 */
