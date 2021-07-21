import React from "react";

function SignUp(props) {
  const { onSignUp } = props;
  return (
    <form onSubmit={onSignUp}>
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
        <label htmlFor="InputUsername">First Name</label>
        <input
          type="text"
          className="form-control"
          id="InputUsername"
          name="firstName"
        />
        <div className="form-group">
          <label htmlFor="InputUsername">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="InputUsername"
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
        <label htmlFor="InputUsername">Country</label>
        <input
          type="text"
          className="form-control"
          id="InputCountry"
          name="country"
        />
        <div className="form-group">
          <label htmlFor="InputUsername">City</label>
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SignUp;
