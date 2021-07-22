import React, { useEffect } from "react";

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
      {data.map((interest) => {
        return interest.data.results.map((el) => {
          console.log(el.title);
          return <p>{el.title}</p>;
        });
      })}
    </div>
  );
}

export default Profile;
