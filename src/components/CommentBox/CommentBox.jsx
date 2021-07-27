import React from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

export default function CommentBox({ image, commentBody, author }) {
  return (
    <Grid style={{ padding: 14, width: "50%" }} className="App">
      <h1>Reviews</h1>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={image} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{author}</h4>
            <p style={{ textAlign: "left" }}>{commentBody}</p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </Grid>
  );
}
