import React from "react";
import { BottomNavigation, Typography } from "@material-ui/core";
import "./Footer.css";

function Footer() {
  return (
    <BottomNavigation className="footerNav">
      <Typography className="footerLinks">
        Created by
        <a href="https://github.com/ritamak">
          <i class="fab fa-github"></i> Rita
        </a>
        &
        <a href="https://github.com/halokaya67">
          <i class="fab fa-github"></i> Halil Ibrahim
        </a>
        with huge effort...
      </Typography>
    </BottomNavigation>
  );
}

export default Footer;
