import React from "react";
import "./CreateArticle.css";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Input } from "@material-ui/core";

export default function CreateArticle(props) {
  const { onCreateArticle } = props;

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="s">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={onCreateArticle}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="section"
                  variant="outlined"
                  required
                  fullWidth
                  id="section"
                  label="section"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="subsection"
                  variant="outlined"
                  required
                  fullWidth
                  id="subsection"
                  label="Sub Section"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.body}
                  variant="outlined"
                  required
                  fullWidth
                  id="body"
                  label="body"
                  name="body"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="created_date"
                  variant="outlined"
                  required
                  fullWidth
                  id="created_date"
                  label="created date"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid>
              <FormHelperText>Upload your photo</FormHelperText>
              <Input type="file" name="myImage" accept="image/png, image/jpg" />
            </Grid>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ color: "white", background: "black" }}
              >
                Create
              </Button>
            </Grid>
            {props.error && <p className="error">{props.error}</p>}
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </>
  );
}
