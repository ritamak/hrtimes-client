import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";

export default function CreatedArticles(props) {
  const [articleDetail, updateArticleDetail] = useState(null);
  const { id } = props.match.params;

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

  if (!articleDetail) {
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
    </>
  );
}
