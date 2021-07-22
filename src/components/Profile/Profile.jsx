import React, { useEffect, Link } from "react";

function Profile(props) {
  const { getData, data, user, onDataChange } = props;
  const { interests } = user;

  useEffect(() => {
    let myPromises = [];
    interests.map((interest) => {
      myPromises.push(getData(interest)); //pushing n promises in this array
    });
    Promise.all(myPromises)
      .then((data) => {
        console.log("see here", data);
        //call some func from App.js to update the data state
        onDataChange(data);
      })
      .catch();
  }, []);

  if (!data.length) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
      {data.map((interest) => {
        return interest.data.results.map((el) => {
          console.log(el.title);
          return (
            <>
              <p>{el.title}</p>
              <a href={el.url}>link for the article</a>
            </>
          );
        });
      })}
    </div>
  );
}

export default Profile;
