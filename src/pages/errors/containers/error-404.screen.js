import React from "react";
import { Link } from "react-router-dom";

// ASSETS && CLASSES
import CloudsSKash404 from "../assets/images/404_vector.svg";
import SuperKash404 from "../assets/images/superkash_404.svg";
import classes from "./modules/error-404.module.scss";

const Error404 = () => {
  const mobile = window.innerWidth < 768;

  return (
    <section className={classes.Error404Wrapper}>
      <div className={classes.SuperKashWrapper}>
        <img src={mobile ? SuperKash404 : CloudsSKash404} alt="SuperKash" />
      </div>
      <div className={classes.Error404Desc}>
        <h1>404</h1>
        <h2>No encontramos la página.</h2>
        <p>
          Tal vez copiaste mal la dirección. <span className="font-bold">¡Hasta allá no llega SuperKash!</span><br/>
          Por favor, regresa.
        </p>
        <Link to="/">Inicio</Link>
      </div>
    </section>
  );
};

export default Error404;
