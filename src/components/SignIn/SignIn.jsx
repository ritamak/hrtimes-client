import React from "react";

function SignIn(props) {
  return (
    <form onSubmit={props.onSignIn}>
      <div>
        <label htmlFor="InputEmail">Email address</label>
        <input type="email" id="InputEmail" name="email" />
      </div>
      <div>
        <label htmlFor="InputPassword">Password</label>
        <input name="password" type="password" id="InputPassword" />
      </div>
      <button type="submit">Submit</button>
      {props.error && <p>{props.error}</p>}
    </form>
  );
}

export default SignIn;
