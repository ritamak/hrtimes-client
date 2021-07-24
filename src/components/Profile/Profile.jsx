import React, { useEffect, Link } from "react";
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
  if (!data.length || !articles.length || !user) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
      <a href={`/${user._id}/edit`}>Edit your profile</a>

      <a href="/create">Create your article</a>
      <br></br>
      <h1>Articles created by our users</h1>
      {articles.map((article, index) => (
        <div key={index}>
          <a href={`/article/${article._id}`}>{article.title}</a>
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
