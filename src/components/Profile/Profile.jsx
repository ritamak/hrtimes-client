import React, { useEffect, Link } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import Navbar from "../MyNav/Navbar";

function Profile(props) {
  const { data, user, onDataChange } = props;
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

  if (!data.length) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <Navbar />
      <h1>Welcome {user.firstName}</h1>
      <a href={user._id}>Edit Profile</a>
      {flatted.map((el) => (
        <>
          <p>{el.section}</p>
          <p>{el.title}</p>
          <a href={el.url}>read article</a>
        </>
      ))}
    </div>
  );
}

export default Profile;
