import React from "react";
import Select from "react-select";
import { Button } from "@material-ui/core";
import { topStoriesTopics } from "../../data/data";

export default function EditProfile(props) {
  const {
    updateUser,
    onEditProfile,
    user,
    onTopicChange,
    onDeleteComment,
    onDeleteArticle,
  } = props;
  const { interests, comments, articles } = user;

  const handleUserName = (event) => {
    let newUserName = event.target.value;
    updateUser({ ...user, username: newUserName });
  };
  const handleFirstName = (event) => {
    let newFirstName = event.target.value;
    updateUser({ ...user, firstName: newFirstName });
  };

  const handleLastName = (event) => {
    let newLastName = event.target.value;
    updateUser({ ...user, lastName: newLastName });
  };

  const handleEmail = (event) => {
    let newEmail = event.target.value;
    updateUser({ ...user, email: newEmail });
  };
  const handleCountry = (event) => {
    let newCountry = event.target.value;
    updateUser({ ...user, country: newCountry });
  };
  const handleCity = (event) => {
    let newCity = event.target.value;
    updateUser({ ...user, city: newCity });
  };
  const handlePassword = (event) => {
    let newPassword = event.target.value;
    updateUser({ ...user, password: newPassword });
  };

  if (!user) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <>
        <div>
          <h1>Your info</h1>
          {!comments.length ? "" : <h5>your comments</h5>}
          {comments &&
            comments.map((comment, index) => {
              return (
                <div key={index}>
                  <p>{comment.commentBody}</p>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onDeleteComment(comment._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          {!articles.length ? "" : <h5>your articles</h5>}
          {articles &&
            articles.map((article, index) => {
              return (
                <div key={index}>
                  <p>{article.title}</p>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onDeleteArticle(article._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          <form onSubmit={onEditProfile}>
            <div className="form-group">
              <label htmlFor="InputUsername">Username</label>
              <input
                type="text"
                className="form-control"
                id="InputUsername"
                name="username"
                value={user.username}
                onChange={handleUserName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputFirstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="InputFirstName"
                name="firstName"
                value={user.firstName}
                onChange={handleFirstName}
              />
              <div className="form-group">
                <label htmlFor="InputLastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputLastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleLastName}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="InputEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="InputEmail"
                name="email"
                value={user.email}
                onChange={handleEmail}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="InputCountry">Country</label>
              <input
                type="text"
                className="form-control"
                id="InputCountry"
                name="country"
                value={user.country}
                onChange={handleCountry}
              />
              <div className="form-group">
                <label htmlFor="InputCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCity"
                  name="city"
                  value={user.city}
                  onChange={handleCity}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="InputPassword">Password</label>
              <input
                name="passwordHash"
                type="password"
                className="form-control"
                id="InputPassword"
                placeholder="re-enter your password"
                onChange={handlePassword}
              />
              <small id="emailHelp" className="form-text text-muted">
                Re-enter your password even if you don't want to change it
              </small>
            </div>

            <h1>Interests</h1>
            <Select
              onChange={onTopicChange}
              closeMenuOnSelect={false}
              defaultValue={[]}
              isMulti
              name="topics"
              options={topStoriesTopics}
              className="basic-multi-select"
              classNamePrefix="select"
              multiValue={interests}
            />
            <input type="file" name="myImage" accept="image/png, image/jpg" />

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </>
    </div>
  );
}
