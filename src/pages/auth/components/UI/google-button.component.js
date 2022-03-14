import React from "react";
import GoogleLogin from "react-google-login";

// COMPONENTS
import { Button } from "../../../../components/UI/button.component";

// CLASSES & ASSETS
import GoogleIcon from "../../assets/images/icons/google.svg";
import classes from "../../assets/css/auth-components.module.scss";

const clientId = process.env.REACT_APP_GOOGLE_ID;

export const GoogleButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Login"
      cookiePolicy={"single_host_origin"}
      render={(props) => (
        <Button onClick={props.onClick} disabled={props.disabled} className={`secondary-button ${classes.GoogleButton}`}>
          <img src={GoogleIcon} width={20} alt="google" className="mr-3" /> Ingresa con Google
        </Button>
      )}
    />
  );
};
