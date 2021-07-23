import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";

export default function CreatedArticles(props) {
  const { article } = props;
  const [articleDetail, updateArticleDetail] = useState(article);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`${API_URL}/api/article/${article._id}`);

        updateArticleDetail(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Article Details fetch failed", err);
      }
    })();
  }, [article._id]);
  console.log(article);

  if (!article.length) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Hello</h1>
      <p>{articleDetail.body}</p>
    </>
  );
}
