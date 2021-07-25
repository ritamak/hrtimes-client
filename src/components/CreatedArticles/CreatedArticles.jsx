import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import CreateComment from "../CreateComment/CreateComment";

export default function CreatedArticles(props) {
  const [articleDetail, updateArticleDetail] = useState(null);
  const { id } = props.match.params;
  const { comments, user, onDeleteArticle, onCreateComments } = props;

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`${API_URL}/api/article/${id}`);

        updateArticleDetail(response.data);
      } catch (err) {
        console.log("Article Details fetch failed", err);
      }
    })();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {articleDetail && (
        <>
          <p>{articleDetail.section}</p>
          <p>{articleDetail.subsection}</p>
          <p>{articleDetail.title}</p>
          <p>{articleDetail.body}</p>
          <p>{articleDetail.created_date}</p>
          <p>{articleDetail.author.username}</p>
          <CreateComment articleId={id} onCreateComments={onCreateComments} />
        </>
      )}
      {comments &&
        comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.author}</p>
            <h5>{comment.commentBody}</h5>
          </div>
        ))}
    </>
  );
}
