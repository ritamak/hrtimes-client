import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Input } from "@material-ui/core";
import Loading from "../Loading/index";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import "./EditArticle.css";

function EditArticle(props) {
  const [articleDetails, updateDetails] = useState(null);
  const { id } = props.match.params;

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        let id = props.match.params.id;
        let response = await axios.get(`${API_URL}/api/article/${id}`);

        updateDetails(response.data);
      } catch (error) {
        console.log("Article fetch failed", error);
      }
    })();
  }, []);

  const handleSectionChange = (event) => {
    let newSection = event.target.value;
    updateDetails({ ...articleDetails, section: newSection });
  };

  const handleSubSectionChange = (event) => {
    let newSubSection = event.target.value;
    updateDetails({ ...articleDetails, subsection: newSubSection });
  };

  const handleTitleChange = (event) => {
    let newTitle = event.target.value;
    updateDetails({ ...articleDetails, title: newTitle });
  };

  const handleBodyChange = (event) => {
    let newBody = event.target.value;
    updateDetails({ ...articleDetails, body: newBody });
  };

  const handleCreatedDateChange = (event) => {
    let newCreatedDate = event.target.value;
    updateDetails({ ...articleDetails, created_date: newCreatedDate });
  };

  const handleAuthorChange = (event) => {
    let newAuthor = event.target.value;
    updateDetails({ ...articleDetails, author: newAuthor });
  };

  if (!articleDetails) {
    return <Loading />;
  }

  const { onEditArticle, error } = props;

  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        className="editArticleContainer"
      >
        <div className={classes.paper}>
          <Typography className="editArticleHeader" variant="h3" gutterBottom>
            Edit Your Article
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => {
              onEditArticle(event, id);
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="section"
                  variant="outlined"
                  required
                  fullWidth
                  label="Section"
                  autoFocus
                  value={articleDetails.section}
                  onChange={handleSectionChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="subsection"
                  variant="outlined"
                  required
                  fullWidth
                  label="Sub-section"
                  autoFocus
                  value={articleDetails.subsection}
                  onChange={handleSubSectionChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Title"
                  name="title"
                  value={articleDetails.title}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="created_date"
                  variant="outlined"
                  required
                  fullWidth
                  label="Created date"
                  autoFocus
                  value={articleDetails.created_date}
                  onChange={handleCreatedDateChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.body}
                  variant="outlined"
                  required
                  fullWidth
                  label="Body Content"
                  name="body"
                  multiline
                  rows={6}
                  rowsMax={Infinity}
                  onChange={handleBodyChange}
                  value={articleDetails.body}
                />
              </Grid>
            </Grid>
            <Grid>
              <FormHelperText>Upload article image</FormHelperText>
              <Grid item>
                <Input
                  type="file"
                  name="myImage"
                  accept="image/png, image/jpg"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={`${classes.submit} formEditArticleButton`}
              >
                Upload
              </Button>
              {error && (
                <Alert
                  variant="filled"
                  severity="error"
                  className="signUpAlert"
                >
                  {error}
                </Alert>
              )}
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </>
  );
}

export default EditArticle;
