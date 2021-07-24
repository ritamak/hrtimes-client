import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";

function Profile(props) {
  const { data, user, onDataChange, articles } = props;
  const { interests } = user;

  useEffect(() => {
    axios
      .post(
        `${API_URL}/api/fetchNews`,
        { interests },
        { withCredentials: true }
      )
      .then((result) => {
        onDataChange(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let flatted = data.flat(Infinity);
  let sorted = flatted.sort(function (a, b) {
    if (a.section > b.section) {
      return 1;
    }
    if (b.section > a.section) {
      return -1;
    }
    return 0;
  });
  if (!data.length || !user) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <Link to={`/${user._id}/edit`}>Profile Info</Link>
      <Link to={"/create"}>Create Article</Link>
      {!articles.length ? "" : <h1>Articles created by our users</h1>}
      {articles &&
        articles.map((article, index) => (
          <div key={index}>
            <Link to={`/article/${article._id}`}>{article.title}</Link>
          </div>
        ))}
      <h1>Articles you may like</h1>
      {flatted.map((article, index) => (
        <div key={index}>
          <p>{article.title}</p>
          <a href={article.url}>read article</a>
        </div>
      ))}
    </div>
  );
}

export default Profile;
