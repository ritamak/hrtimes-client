import React from "react";
import { TextField, Button } from "@material-ui/core";
import "./CreateComment.css";

function CreateComment(props) {
  const { onCreateComments, articleId } = props;

  return (
    <div id="createCommentDiv">
      <h1>Review article</h1>
      <form
        onSubmit={(event) => {
          onCreateComments(event, articleId);
        }}
        autoComplete="off"
      >
        <TextField
          id="outlined"
          label="comment the article here"
          variant="outlined"
          name="commentBody"
          multiline
          rows={1}
          fullWidth
          rowsMax={Infinity}
          item
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateComment;
