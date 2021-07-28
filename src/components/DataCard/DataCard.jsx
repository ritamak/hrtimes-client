import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./DataCard.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";

const useStyles = makeStyles({
  media: {
    height: 150,
  },
  cards: {
    height: 320,
  },
  link: {
    textDecoration: "none",
  },
});

export default function DataCard({ section, title, abstract, image, url }) {
  const classes = useStyles();

  return (
    <div>
      <Grid className="cardWrappers">
        <a href={url} className={classes.link}>
          <Card className="cardTwo">
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
                style={{ backgroundColor: "#e6e6e6" }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bold" }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ color: "black" }}
                >
                  {abstract}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Grid
              container
              justifyContent="flex-end"
              style={{ backgroundColor: "white" }}
            >
              <CardActions>
                <a href={url}>
                  <Button size="small">
                    <ArrowForwardOutlinedIcon />
                  </Button>
                </a>
              </CardActions>
            </Grid>
          </Card>
        </a>
      </Grid>
      <br></br>
      <br></br>
    </div>
  );
}
