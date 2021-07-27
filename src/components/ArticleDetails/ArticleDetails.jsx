import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import CreateComment from "../CreateComment/CreateComment";
import ArticleCard from "../ArticleCard/ArticleCard";
import Grid from "@material-ui/core/Grid";
import CommentBox from "../CommentBox/CommentBox";
import "./ArticleDetails.css";

export default function ArticleDetails(props) {
  const [articleDetail, updateArticleDetail] = useState(null);
  const [commentDetails, updateCommentDetails] = useState([]);
  const { id } = props.match.params;
  const { user, onCreateComments } = props;

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`${API_URL}/api/article/${id}`);
        let comments = await axios.get(`${API_URL}/api/article/${id}/comments`);

        updateCommentDetails(comments.data);
        updateArticleDetail(response.data);
      } catch (err) {
        console.log("Article Details fetch failed!", err);
      }
    })();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {articleDetail && (
        <Grid container className="articleDetail">
          <ArticleCard
            section={articleDetail.section}
            subsection={articleDetail.subsection}
            title={articleDetail.title}
            body={articleDetail.body}
            created_date={articleDetail.created_date}
            username={articleDetail.author.username}
            image={articleDetail.image}
          />
        </Grid>
      )}
      <Grid container className="commentsWrapper">
        {commentDetails &&
          commentDetails.map((comment, index) => {
            console.log(comment);
            return (
              <CommentBox
                image={comment.author.image}
                commentBody={comment.commentBody}
                author={comment.author.username}
                key={index}
              />
            );
          })}
        <CreateComment articleId={id} onCreateComments={onCreateComments} />
      </Grid>
    </>
  );
}
