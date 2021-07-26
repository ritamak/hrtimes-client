import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";
import SortButton from "../SortButton/SortButton";
import "./Profile.css";
import ArticleCard from "../ArticleCard/ArticleCard";
import DataCard from "../DataCard/DataCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function Profile(props) {
  const { data, user, onDataChange, articles } = props;
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
  if (!data.length || !user) {
    return <p>Loading</p>;
  }
  console.log(flatted);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="welcome">
          <h1>Hi {user.username.toUpperCase()}!</h1>
        </div>
        {!articles.length ? "" : <h3>by our users:</h3>}
        <div>
          {articles &&
            articles.map((article, index) => (
              <div key={index} className="data">
                <ArticleCard
                  section={article.section}
                  title={article.title}
                  author={article.author}
                  id={article._id}
                />
              </div>
            ))}
        </div>
        <h3>Articles you may like</h3>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <SortButton justifyContent="flex-end" />
          </Grid>
        </Grid>
        <br></br>
        {flatted.map((article, index) => {
          console.log(article);
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
      </Container>
    </div>
  );
}

export default Profile;
