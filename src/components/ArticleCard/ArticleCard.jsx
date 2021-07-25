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
});

export default function ArticleCard({ section, title, author, id }) {
  const classes = useStyles();

  return (
    <Card style={{ width: "30%" }}>
      <CardContent>
        <Typography className={classes.section} color="textSecondary">
          {section}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {author}
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
  );
}
