import React from "react";
import { Link } from "react-router-dom";

// CLASSES
import classes from "./modules/error-404.module.scss";

const Error404 = () => {
  return (
    <section className={classes.Error404Wrapper}>
      <div className={classes.SuperKash404} />
      <div className={classes.Error404Desc}>
        <h1>404</h1>
        <h2>No encontramos la página.</h2>
        <p>
          Tal vez copiaste mal la dirección. <span className="font-bold">¡Hasta allá no llega SuperKash!</span><br/>
          Por favor, regresa.
        </p>
        <Link to="/">Regresar</Link>
      </div>
    </section>
  );
};

export default Error404;
