import React from "react";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Avatar,
} from "@material-ui/core";

function Navbar(props) {
  const { user, onLogOut } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Link to={"/profile"}>
              <Button>
                <Avatar alt="profile" src={user.image} />
              </Button>
            </Link>
          </div>
          <div>
            <SearchIcon />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button onClick={onLogOut} color="inherit">
            <ExitToApp />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
