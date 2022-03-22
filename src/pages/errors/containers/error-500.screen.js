import React from "react";
import { Link } from "react-router-dom";

// CLASSES
import classes from "./modules/error-500.module.scss";

export const Error500 = ({ error }) => {
  console.log(error);

  return (
    <section className={classes.Error500Wrapper}>
      <div className={classes.SuperKash500} />
      <div className={classes.Error500Desc}>
        <h1>500</h1>
        <h2>Ha ocurrido un error inesperado.</h2>
        <p>
          ¡No te preocupes! Ya lo estamos solucionando <span className="font-bold">y SuperKash nos está ayudando.</span><br/>
          Vuelve más tarde.
        </p>
        <Link to="/">Regresar</Link>
      </div>
    </section>
  );
};
