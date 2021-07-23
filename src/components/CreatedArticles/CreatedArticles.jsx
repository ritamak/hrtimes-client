import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

export default function CreatedArticles(props) {
  const [articleDetail, updateArticleDetail] = useState(null);
  const { id } = props.match.params;
  const { onCreateComments, comments, user } = props;

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`${API_URL}/api/article/${id}`);
        updateArticleDetail(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Article Details fetch failed", err);
      }
    })();
  }, [id]);

  if (!articleDetail || !user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Articles our users created</h1>
      <p>{articleDetail.section}</p>
      <p>{articleDetail.subsection}</p>
      <p>{articleDetail.title}</p>
      <p>{articleDetail.body}</p>
      <p>{articleDetail.created_date}</p>
      <p>{articleDetail.author}</p>
      <h5>Comments</h5>
      <form onSubmit={onCreateComments} autoComplete="off">
        <TextField
          id="outlined-basic"
          label="comment the article here"
          variant="outlined"
          style={{ width: "80vw" }}
          name="commentBody"
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
