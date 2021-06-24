import React from "react";
import GoogleLogin from "react-google-login";

import Button from "../../../core/components/UI/button.component";
import GoogleIcon from "../../assets/images/icons/google.svg";

const GoogleButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId="202060127908-2f1qk4eq495ccdm3r6ah185vca55eflm.apps.googleusercontent.com"
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
