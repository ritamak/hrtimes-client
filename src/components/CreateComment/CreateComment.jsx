import React from "react";
import { TextField, Button } from "@material-ui/core";

function CreateComment(props) {
  const { onCreateComments, articleId } = props;

  return (
    <div>
      <h5>Comments</h5>
      <form
        onSubmit={(event) => {
          onCreateComments(event, articleId);
        }}
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="comment the article here"
          variant="outlined"
          name="commentBody"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateComment;
