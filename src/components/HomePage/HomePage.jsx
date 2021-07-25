import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import "./HomePage.css";

function HomePage() {
  return (
    <div className="homePageDiv">
      <div className="wrapperImage">
        <img
          src="/media/title.png"
          alt="logo"
          className="homePageImg"
          style={{ width: "20%" }}
        />
        <div className="homePageButtons">
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button variant="outlined" style={{ backgroundColor: "white" }}>
              Sign In
            </Button>
          </Link>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained">Sign Up</Button>
          </Link>
        </div>
      </div>
      <hr style={{ width: "100%" }}></hr>

      <div className="wrapper">
        <div className="homePageBox">
          <p style={{ width: "45vw" }}>
            Gather all topics of your interest.<br></br>
            You can easily choose the topics you are interested in and check
            them on your feed.<br></br>
            Join us and keep yourself posted!
          </p>
          <img
            src="/media/landing.jpg"
            alt="newspaper"
            style={{ width: "45vw" }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
