import React, { useEffect } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

function Profile(props) {
  const { data, user, onDataChange, onLogOut } = props;
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

  if (!data.length) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <Navbar onLogOut={onLogOut} user={user} />
      <h1>Welcome {user.firstName}</h1>
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
