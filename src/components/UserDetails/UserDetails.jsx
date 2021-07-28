import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function UserDetails(props) {
  const [userDetails, updateUserDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const id = props.match.params.id;

        let userDetailsResponse = await axios.get(
          `${API_URL}/api/users/${id}`,
          { withCredentials: true }
        );

        updateUserDetails(userDetailsResponse.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <img src={userDetails.image} alt="user-pic" />
      <div>
        <p>{userDetails.username}</p>
        <button>Follow</button>
      </div>
      <p>
        {userDetails.firstName} {userDetails.lastName}
      </p>
      <p>{userDetails.email}</p>
      <p>{userDetails.country}</p>
      <p>{userDetails.city}</p>
      <>
        {userDetails.interests.map((interest) => {
          console.log(interest);
          return <p>{interest}</p>;
        })}
      </>
      <>
        {userDetails.articles.map((article) => {
          console.log(article);
          return <p>{article.title}</p>;
        })}
      </>
      <>
        {userDetails.comments.map((comment) => {
          console.log(comment);
          return <p>{comment.commentBody}</p>;
        })}
      </>
      <>
        {userDetails.following.map((user) => {
          console.log(user);
          return <p>{user.username}</p>;
        })}
      </>
    </div>
  );
}

export default UserDetails;
