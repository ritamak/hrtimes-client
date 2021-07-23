import React, { useEffect, Link } from "react";
import { API_URL } from "../../config";
import axios from "axios";

function Profile(props) {
  const { data, user, onDataChange, article } = props;
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
  console.log(sorted);
  console.log(article);
  if (!data.length) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
      <a href={`/${user._id}/edit`}>Edit your profile</a>

      <a href="/create">Create your article</a>
      <br></br>
      <h1>Articles created by our users</h1>
      {article.map((el, index) => (
        <div key={index}>
          <a href={`/article/${el._id}`}>{el.title}</a>
        </div>
      ))}

      <h1>Articles you may like</h1>

      {flatted.map((el, index) => (
        <div key={index}>
          <p>{el.title}</p>
          <a href={el.url}>read article</a>
        </div>
      ))}
    </div>
  );
}

export default Profile;
