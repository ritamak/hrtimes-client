import React, { useEffect } from "react";
import { API_URL } from "../../config";
import axios from "axios";

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

  if (!data.length) {
    return <p>Loading</p>;
  }
  let spreaded = [...data];
  console.log(spreaded);
  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
      {flatted.map((el) => (
        <>
          <p>{el.title}</p>
          <a href={el.url}>read article</a>
        </>
      ))}
    </div>
  );
}

export default Profile;
