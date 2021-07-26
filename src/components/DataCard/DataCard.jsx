import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function DataCard({ section, title, abstract, image, url }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          {image && (
            <CardMedia
              className={classes.media}
              image={image}
              title={section}
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {abstract}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={url}>
            <Button size="small" color="primary">
              Share
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
