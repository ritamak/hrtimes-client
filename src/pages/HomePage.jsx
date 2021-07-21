import "../App.css";
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <h1>Welcome to HR Times</h1>

      <img src="/media/journal.png" />

      <p>
        HR Times is a platform to gather all topics of your interest. You can
        easily choose the topics you are interested in and check them on your
        feed! Join us and keep yourself posted!
      </p>

      <Link to="/signin">
        <button>Sing In</button>
      </Link>

      <Link to="/signup">
        <button>Sing Up</button>
      </Link>
    </div>
  );
}

export default HomePage;
                