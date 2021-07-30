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
    <AppBar position="static">
      <Toolbar>
        <IconButton Button edge="start">
          <Link to={"/profile"}>
            <Button>
              <Avatar id="image" alt="profile" src={user.image} />
            </Button>
          </Link>
        </IconButton>
        <div className="navBarButtonsContainer">
          <Link to={`/create`}>
            <Button className="navBarButtons">
              <CreateIcon />
              <span className="navBarButtonLabels">Create Article</span>
            </Button>
          </Link>
          <Link to={`/${user._id}/edit`}>
            <Button className="navBarButtons">
              <i class="fas fa-user-edit fa-lg"></i>
              <span className="navBarButtonLabels">Edit Profile</span>
            </Button>
          </Link>
          <Button className="navBarButtons" onClick={onLogOut}>
            <ExitToApp />
            <span className="navBarButtonLabels">Logout</span>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

/*
 */
