import React from "react";
import { BottomNavigation, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

function Footer() {
  return (
    <BottomNavigation>
      <Typography>
        Created by <GitHubIcon /> Rita & <GitHubIcon /> Halil!!!
      </Typography>
    </BottomNavigation>
  );
}

export default Footer;
