import React from "react";

import classes from "../assets/css/affiliates-containers.module.scss";

export const AffiliatesList = ({ ...rest }) => {
  return (
    <div {...rest}>
      <article className={classes.AffiliatesSection}>
        <h1>Mis referidos</h1>
        <p>Haz compartido tu código con 5 amigos y has ganado 1 KASH. Recuerda que ganas KASH cada vez que tus amigos se registran con tu código y realizan su primer cambio.</p>
      </article>
    </div>
  );
};
