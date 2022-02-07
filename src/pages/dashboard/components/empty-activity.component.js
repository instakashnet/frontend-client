import React from "react";
import { Link } from "react-router-dom";

import tridimensionalKash from "../assets/images/3d-kash.svg";

import classes from "../assets/css/activity-components.module.scss";

const NoActivity = () => {
  return (
    <div className={classes.NoActivity}>
      <img src={tridimensionalKash} alt="kash" />
      <h1>Realiza tu primera operación</h1>
      <p>
        Aún no has realizado ningún cambio. <br /> Comienza a visualizar tu actividad realizando tu primer cambio,
      </p>
      <Link to="/currency-exchange" className="action-button">
        Realizar un cambio
      </Link>
    </div>
  );
};

export default NoActivity;
