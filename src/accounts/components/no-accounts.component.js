import React from "react";

import { Button } from "../../components/UI/button.component";

import NoAccountImg from "../assets/images/no-accounts.svg";
import classes from "../assets/css/account-components.module.scss";

const NoAccounts = ({ onAddAccount }) => {
  return (
    <div className={classes.NoAccountWrapper}>
      <img src={NoAccountImg} alt="no-account" />
      <h1>Aún no tienes cuentas registradas</h1>
      <p>
        Para empezar agrega tu primera cuenta. Puedes agregar hasta <b>10</b> cuentas en soles y <b>10</b> en dólares, <br /> todas deben pertenecer al mismo afiliado.
      </p>
      <Button type="button" onClick={onAddAccount} className="action-button">
        Agregar cuenta
      </Button>
    </div>
  );
};

export default NoAccounts;
