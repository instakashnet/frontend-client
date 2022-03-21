import React from "react";
import { Link } from "react-router-dom";

// ASSETS && CLASSES
import CloudsSKash500 from "../assets/images/500_vector.svg";
import SuperKash500 from "../assets/images/superkash_500.svg";
import classes from "./modules/error-500.module.scss";

export const Error500 = ({ error }) => {
  console.log(error);

  const mobile = window.innerWidth < 768;

  return (
    <section className={classes.Error500Wrapper}>
      <div className={classes.SuperKashWrapper}>
        <img src={mobile ? SuperKash500 : CloudsSKash500} alt="SuperKash" />
      </div>
      <div className={classes.Error500Desc}>
        <h1>500</h1>
        <h2>Ha ocurrido un error inesperado.</h2>
        <p>
          ¡No te preocupes! Ya lo estamos solucionando <span className="font-bold">y SuperKash nos está ayudando.</span><br/>
          Vuelve más tarde.
        </p>
        <Link to="/">Inicio</Link>
      </div>
    </section>
  );
};
