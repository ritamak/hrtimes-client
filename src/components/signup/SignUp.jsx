import React from "react";
import Select from "react-select";

import { topStoriesTopics } from "../../data/data";

function SignUp(props) {
  const { onSignUp, interests, onTopicChange } = props;

  return (
    <>
      <div>
        <h1>Your info</h1>
        <form
          onSubmit={onSignUp}
          action="/upload"
          enctype="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="InputUsername"
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputFirstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="InputFirstName"
              name="firstName"
            />
            <div className="form-group">
              <label htmlFor="InputLastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="InputLastName"
                name="lastName"
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
            />
            <div className="form-group">
              <label htmlFor="InputCity">City</label>
              <input
                type="text"
                className="form-control"
                id="InputCity"
                name="city"
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
            />
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
  );
}

export default SignUp;
