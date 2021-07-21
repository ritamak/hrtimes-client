import React from "react";

function Profile({ foodData }) {
  const { results } = foodData;
  console.log(results);
  //console.log(foodData);

  if (!results) {
    return <p>Loading</p>;
  }
  return (
    <div>
      {results.map((food, i) => {
        return <p key={i}>{food.title}</p>;
      })}
    </div>
  );
}

export default Profile;
