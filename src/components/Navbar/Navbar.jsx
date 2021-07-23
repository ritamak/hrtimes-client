import React from "react";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
} from "@material-ui/core";

function Navbar(props) {
  const { user, onLogOut } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Link to={"/profile"}>
            <Button>
              <img src={user.image} alt="profile" />
            </Button>
          </Link>
          <div>
            <div>
              <SearchIcon />
            </div>
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
