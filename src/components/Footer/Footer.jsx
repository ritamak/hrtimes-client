import React from "react";
import { BottomNavigation, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Footer.css";

function Footer() {
  return (
    <BottomNavigation>
      <div className="footer">
        <Typography>
          Created by <GitHubIcon /> Rita & <GitHubIcon /> Halil!!!
        </Typography>
      </div>
    </BottomNavigation>
  );
}

export default Footer;
