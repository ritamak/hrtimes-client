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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
      <div className="card">
        <Card>
          <CardActionArea>
            {image && (
              <CardMedia
                className={classes.media}
                image={image}
                title={section}
              />
            )}
            <CardContent style={{ backgroundColor: "#737373" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontWeight: "bold" }}
              >
                {title}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontWeight: "bold" }}
              >
                {section}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontWeight: "bold" }}
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
                style={{ fontWeight: "bold" }}
              >
                {username}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to={`/article/${id}`}>
              <Button size="small">
                <ArrowForwardOutlinedIcon />
              </Button>
            </Link>
          </CardActions>{" "}
        </Card>
        <br></br>
      </div>
    </div>
  );
}
