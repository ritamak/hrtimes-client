import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./UserArticleCard.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 210,
  },
  cards: {
    height: 160,
  },
  link: {
    textDecoration: "none",
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
    <div>
      <Grid className="cardWrappers">
        <Link to={`/article/${id}`} className={classes.link}>
          <Card className="card">
            <CardActionArea>
              {image && (
                <CardMedia
                  className={classes.media}
                  image={image}
                  title={section}
                />
              )}
              <CardContent
                className={classes.cards}
                style={{ backgroundColor: "#404040" }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  {title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  {section}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  {subsection}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ color: "white" }}
                >
                  {body}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bold" }}
                >
                  {created_date}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  {username}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Grid container justifyContent="flex-end">
              <CardActions style={{ backgroundColor: "white" }}>
                <Link to={`/article/${id}`}>
                  <Button size="small">
                    <ArrowForwardOutlinedIcon />
                  </Button>
                </Link>
              </CardActions>
            </Grid>
          </Card>
        </Link>
        <br></br>
      </Grid>
    </div>
  );
}
