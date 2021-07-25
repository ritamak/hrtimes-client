import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import "./HomePage.css";

function HomePage() {
  return (
    <div className="homePageDiv">
      <img src="/media/title.png" alt="logo" className="homePageImg" />
      <div className="homePageText">
        <p>
          Gather all topics of your interest.<br></br>
          You can easily choose the topics you are interested in and check them
          on your feed.<br></br>
          Join us and keep yourself posted!
        </p>
      </div>
      <div className="homePageButtons">
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>

        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
