import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";
import SortButton from "../SortButton/SortButton";
import "./Profile.css";
import ArticleCard from "../ArticleCard/ArticleCard";
import DataCard from "../DataCard/DataCard";

function Profile(props) {
  const {
    data,
    user,
    onDataChange,
    articles,
    fetchingUser,
    updateStatus,
    updateUser,
  } = props;
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

    (async () => {
      try {
        let userResponse = await axios.get(`${API_URL}/api/profile`, {
          withCredentials: true,
        });

        updateUser(userResponse.data);

        updateStatus(false);
      } catch (err) {
        console.log("User fetch failed", err);
        updateStatus(false);
      }
    })();
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
  if (!data.length || !user || fetchingUser) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div className="welcome">
        <h1>Hi {user.username.toUpperCase()}!</h1>
      </div>
      {!articles.length ? "" : <h1>Articles created by our users</h1>}
      <div className="articleCard">
        {articles &&
          articles.map((article, index) => (
            <div key={index}>
              <ArticleCard
                section={article.section}
                title={article.title}
                author={article.author}
                id={article._id}
              />
            </div>
          ))}
      </div>
      <h1>Articles you may like</h1>
      <SortButton />
      {flatted.map((article, index) => {
        return (
          <div key={index} className="dataCard">
            <DataCard
              section={article.section}
              title={article.title}
              abstract={article.abstract}
              url={article.url}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
