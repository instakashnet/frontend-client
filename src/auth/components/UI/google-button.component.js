import React from "react";
import GoogleLogin from "react-google-login";

import { Button } from "../../../components/UI/button.component";
import GoogleIcon from "../../assets/images/icons/google.svg";

export const GoogleButton = ({ onSuccess, onFailure }) => {
  const clientId = process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_GOOGLE_ID : process.env.REACT_APP_GOOGLE_ID;

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Login"
      cookiePolicy={"single_host_origin"}
      render={(props) => (
        <Button onClick={props.onClick} disabled={props.disabled} className="secondary-button flex items-center justify-center">
          <img src={GoogleIcon} width={20} alt="google" className="mr-3" /> Ingresa con google
        </Button>
      )}
    />
  );
};
