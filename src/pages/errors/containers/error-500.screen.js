import * as Sentry from "@sentry/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// CLASSES
import classes from "./modules/error-500.module.scss";

export const Error500 = ({ error }) => {
  const user = useSelector(state => state.Auth.user),
    date = new Date(),
    fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    hours = date.getHours(),
    minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    inErrorComponent = error.stack.match(/at \w+/g)[0].split(' ')[1];

  let errorString = `Error: ${error}\nComponente: ${inErrorComponent}\nFecha: ${fullDate}, ${hours}:${minutes}\nUsuario: ${user.name} (${user.email})`;

  if (process.env.REACT_APP_STAGE === "prod") {
    Sentry.captureException(new Error(errorString));
  } else {
    console.log(errorString);
  }

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
