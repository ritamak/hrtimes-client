import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import CreateComment from "../CreateComment/CreateComment";
import ArticleCard from "../ArticleCard/ArticleCard";
import Grid from "@material-ui/core/Grid";
import CommentBox from "../CommentBox/CommentBox";
import "./ArticleDetails.css";
import Loading from "../Loading/index";

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
  }, []);

  const handleIncLikeArticle = (event, id) => {
    event.preventDefault();
    axios
      .post(
        `${API_URL}/api/article/${id}/incLike`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        props.history.push(`/article/${id}`);
        updateArticleDetail(response.data);
      })
      .catch((error) => {
        console.log("Article not liked!", error);
      });
  };

  const handleDecLikeArticle = (event, id) => {
    event.preventDefault();
    axios
      .post(
        `${API_URL}/api/article/${id}/decLike`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        props.history.push(`/article/${id}`);
        updateArticleDetail(response.data);
      })
      .catch((error) => {
        console.log("Article not unliked!", error);
      });
  };

  const handleIncDislikeArticle = (event, id) => {
    event.preventDefault();
    axios
      .post(
        `${API_URL}/api/article/${id}/incDislike`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        props.history.push(`/article/${id}`);
        updateArticleDetail(response.data);
      })
      .catch((error) => {
        console.log("Article not disliked!", error);
      });
  };

  const handleDecDislikeArticle = (event, id) => {
    event.preventDefault();
    axios
      .post(
        `${API_URL}/api/article/${id}/decDislike`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        props.history.push(`/article/${id}`);
        updateArticleDetail(response.data);
      })
      .catch((error) => {
        console.log("Dislike couldn't be removed!", error);
      });
  };

  const handleFavArticle = (event, id) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/api/article/${id}/fav`, {}, { withCredentials: true })
      .then((response) => {
        props.history.push(`/article/${id}`);
        updateArticleDetail(response.data);
      })
      .catch((error) => {
        console.log("Article not added to favorites!", error);
      });
  };

  const handleUnfavArticle = (event, id) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/api/article/${id}/unfav`, {}, { withCredentials: true })
      .then((response) => {
        props.history.push(`/article/${id}`);
        updateArticleDetail(response.data);
      })
      .catch((error) => {
        console.log("Article not removed from favorites!", error);
      });
  };

  if (!user || !articleDetail || !commentDetails) {
    return <Loading />;
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
            authorId={articleDetail.author._id}
            image={articleDetail.image}
            author={articleDetail.author.username}
            articleId={id}
            likes={articleDetail.likes}
            dislikes={articleDetail.dislikes}
            favorites={articleDetail.favorites}
            userId={user._id}
            onIncLikeArticle={handleIncLikeArticle}
            onDecLikeArticle={handleDecLikeArticle}
            onIncDislikeArticle={handleIncDislikeArticle}
            onDecDislikeArticle={handleDecDislikeArticle}
            onFavArticle={handleFavArticle}
            onUnfavArticle={handleUnfavArticle}
          />
        </Grid>
      )}
      {commentDetails.length && (
        <Grid container className="commentsWrapper">
          <h1>Reviews</h1>

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
        </Grid>
      )}
      <CreateComment articleId={id} onCreateComments={onCreateComments} />
    </>
  );
}
