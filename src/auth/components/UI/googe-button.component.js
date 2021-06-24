import React from "react";
import GoogleLogin from "react-google-login";

import Button from "../../../core/components/UI/button.component";
import GoogleIcon from "../../assets/images/icons/google.svg";

const GoogleButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId="202060127908-3bn0eg60kljv6a03nhttcddlmkmqd5is.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Login"
      render={(props) => (
        <Button onClick={props.onClick} disabled={props.disabled} className="secondary-button">
          <img src={GoogleIcon} width={20} alt="google" /> Acceder con google
        </Button>
      )}
    />
  );
};

export default GoogleButton;
