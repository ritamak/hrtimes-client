import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import "./HomePage.css";

function HomePage() {
  return (
    <div className="homePageDiv">
      <div className="wrapperImage">
        <img src="/media/title.png" alt="logo" className="homePageLogo" />
      </div>
      <hr className="homePageLine" />

      <Grid container spacing={0} className="homePageIntroContainer">
        <Grid item xs={11} sm={10} md={8} lg={5} className="homePageIntroBox">
          <p className="homePageIntro">
            Gather all topics of your interest.<br></br>
            You can easily choose the topics you are interested in and check
            them on your feed.<br></br>
            Join us and keep yourself posted!
          </p>
          <Link className="signInLink" to="/signin">
            <Button className="signInButton" variant="outlined">
              <i class="fas fa-sign-in-alt"></i>
              Sign In
            </Button>
          </Link>
          <p className="signUpText">
            Don't have an account?
            <Link to="/signup" className="signUpLink">
              {" "}
              Sign Up!...
            </Link>
          </p>
        </Grid>
        <Grid item xs={11} sm={10} md={8} lg={5} className="homePageImg">
          <img src="/media/landing.jpg" alt="newspaper"></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
