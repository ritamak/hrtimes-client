import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import "./ArticleCard.css";
import Paper from "@material-ui/core/Paper";

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
  username,
  image,
  id,
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
            variant="h1"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h2"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {subsection}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {section}
          </Typography>

          <Typography variant="body2" component="h2" style={{ color: "black" }}>
            {body}
          </Typography>
          <br></br>
          <Typography
            gutterBottom
            variant="h4"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {username}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {created_date}
          </Typography>

          <br></br>
        </Grid>
      </Paper>
    </>
  );
}
