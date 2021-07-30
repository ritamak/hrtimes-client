import React from "react";
import GoogleLogin from "react-google-login";

function GoogleButton(props) {
  const { onSuccess, onFailure } = props;

  return (
    <div>
      <GoogleLogin
        clientId="123496586333-5blp5fl4g8ctr69cashbdcjf8e8p9qa9.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default GoogleButton;
