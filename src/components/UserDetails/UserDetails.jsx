import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

function UserDetails(props) {
  const [userDetails, updateUserDetails] = useState(null);
  const id = props.match.params.id;
  const { onFollowUser } = props;

  useEffect(() => {
    (async () => {
      try {
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
      <button
        onClick={() => {
          onFollowUser(id);
        }}
      >
        Follow
      </button>
      <p>{userDetails.username}</p>
      <p>
        {userDetails.firstName} {userDetails.lastName}
      </p>
      <p>{userDetails.email}</p>
      <p>{userDetails.country}</p>
      <p>{userDetails.city}</p>
      <>
        {userDetails.interests.map((interest, index) => {
          return <p key={index}>{interest}</p>;
        })}
      </>
      <>
        {userDetails.articles.map((article, index) => {
          return <p key={index}>{article.title}</p>;
        })}
      </>
      <>
        {userDetails.comments.map((comment, index) => {
          return <p key={index}>{comment.commentBody}</p>;
        })}
      </>
      <>
        {userDetails.following.map((user, index) => {
          return (
            <p>
              <Link key={index} to={`/users/${user._id}`}>
                {user.username}
              </Link>
            </p>
          );
        })}
      </>
    </div>
  );
}

export default UserDetails;
