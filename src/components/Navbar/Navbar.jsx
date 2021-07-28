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
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={24}>
          <Grid item xs={9}>
            <Typography variant="h5">rh times</Typography>
          </Grid>

          <Grid item xs={3}>
            <div>
              <Link to={"/profile"} style={{ marginRight: "0px" }}>
                <Button>
                  <Avatar alt="profile" src={user.image} />
                </Button>
              </Link>
              <Link to={`/${user._id}/edit`} style={{ color: "white" }}>
                <MoreVertOutlinedIcon />
              </Link>
              <Button
                variant="text"
                component={Link}
                to="/create"
                color="default"
                style={{ color: "white" }}
              >
                <CreateIcon />
              </Button>
              <Button
                onClick={onLogOut}
                color="inherit"
                className="logOutButton"
              >
                <ExitToApp classname="logOutButton" />
              </Button>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

/*
 <AppBar position="static" style={{ background: "#000000" }}>
      <Toolbar>
        <IconButton edge="start">
          <Link to={"/profile"}>
            <Button>
              <Avatar alt="profile" src={user.image} />
            </Button>
          </Link>
        </IconButton>
<<<<<<< HEAD
        <Link to={`/create`} style={{ color: "#ffffff" }}>
          <CreateIcon /> CREATE ARTICLE
        </Link>
        <Link to={`/${user._id}/edit`} style={{ color: "#ffffff" }}>
          <MoreVertOutlinedIcon /> PROFILE INFO
        </Link>
        <Button
          onClick={onLogOut}
          color="inherit"
          edge="end"
          className="logOutButton"
        >
          <ExitToApp classname="logOutButton" /> LogOut
=======
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
>>>>>>> 7df419d2c98d2164898dd2134cae96e72b85bc5a
        </Button>
      </Toolbar>
    </AppBar>

     */
