import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import "./ArticleCard.css";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  media: {
    height: 500,
  },
});

export default function UserArticleCard({
  section,
  subsection,
  title,
  body,
  created_date,
  author,
  image,
  articleId,
  authorId,
  likes,
  dislikes,
  favorites,
  userId,
  onIncLikeArticle,
  onDecLikeArticle,
  onIncDislikeArticle,
  onDecDislikeArticle,
  onUnfavArticle,
  onFavArticle,
}) {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={3} className="cardDetailsWrapper">
        <Grid>
          {image && (
            <CardMedia
              className={classes.media}
              image={image}
              title={section}
            />
          )}

          <Typography
            gutterBottom
            variant="h2"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {section}
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {subsection}
          </Typography>

          <Typography variant="p" component="h2" style={{ color: "black" }}>
            {body}
          </Typography>
          <br></br>

          <Typography
            gutterBottom
            variant="body"
            style={{ fontWeight: "bold" }}
          >
            {created_date}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: "30px",
            }}
          >
            <Link to={`/users/${authorId}`}>{author}</Link>
          </Typography>
          <Grid container className="likes">
            {favorites.includes(userId) ? (
              <Grid>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => {
                    onUnfavArticle(event, articleId);
                  }}
                >
                  <i class="fas fa-star"></i>
                </Button>
              </Grid>
            ) : (
              <Grid>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => {
                    onFavArticle(event, articleId);
                  }}
                >
                  <i class="far fa-star"></i>
                </Button>
              </Grid>
            )}
            {likes.includes(userId) ? (
              <Grid>
                <Typography gutterBottom variant="h5" component="h5">
                  {likes.length}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => {
                    onDecLikeArticle(event, articleId);
                  }}
                >
                  <i class="fas fa-thumbs-up"></i>
                </Button>
              </Grid>
            ) : (
              <Grid>
                <Typography gutterBottom variant="h5" component="h5">
                  {likes.length}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => {
                    onIncLikeArticle(event, articleId);
                  }}
                >
                  <i class="far fa-thumbs-up"></i>
                </Button>
              </Grid>
            )}
            {dislikes.includes(userId) ? (
              <Grid>
                <Typography gutterBottom variant="h5" component="h5">
                  {dislikes.length}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => {
                    onDecDislikeArticle(event, articleId);
                  }}
                >
                  <i class="fas fa-thumbs-down"></i>
                </Button>
              </Grid>
            ) : (
              <Grid>
                <Typography gutterBottom variant="h5" component="h5">
                  {dislikes.length}
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => {
                    onIncDislikeArticle(event, articleId);
                  }}
                >
                  <i class="far fa-thumbs-down"></i>
                </Button>
              </Grid>
            )}
          </Grid>
          <br></br>
        </Grid>
      </Paper>
    </>
  );
}
