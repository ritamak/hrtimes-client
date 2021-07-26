import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";

const useStyles = makeStyles({
  section: {
    fontSize: 14,
    marginBottom: 10,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
});

export default function ArticleCard({ section, title, author, id }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Card style={{ backgroundColor: "#ababab" }}>
        <CardContent>
          <Typography className={classes.section} color="textSecondary">
            {section}
          </Typography>
          <Typography variant="h5" component="h2" style={{ color: "white" }}>
            {title}
          </Typography>
          <Typography variant="body2" component="p" style={{ color: "black" }}>
            {author.username}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/article/${id}`}>
            <Button size="small">
              <ArrowForwardOutlinedIcon />
            </Button>
          </Link>
        </CardActions>
      </Card>
      <br></br>
    </div>
  );
}
