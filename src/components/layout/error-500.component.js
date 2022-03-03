import React from "react";
import { Link } from "react-router-dom";

// ASSETS && CLASSES
import IKIcon from "../../assets/images/icons/icon.svg";
import classes from "./modules/error-500.module.scss";

export const Error500 = ({ error }) => {
  console.log(error);

  return (
    <div className={classes.Error500Wrapper}>
      <img src={IKIcon} alt="Instakash" />
      <h1>
        <span>Error</span> 500
      </h1>
      <p>
        <span className="font-bold">Vaya, lo sentimos.</span> Al parecer se ha presentado un error inesperado de nuestro lado. <br /> Estamos trabajando para solucionar el problema
        a la brevedad posible.
      </p>
      <p>De momento te ofrecemos la opción de:</p>
      <Link to="/login">Regresar</Link>
    </div>
  );
};
