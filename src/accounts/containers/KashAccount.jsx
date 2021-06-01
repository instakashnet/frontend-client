import React from "react";
import { Link } from "react-router-dom";

import KashIcon from "../../core/assets/images/kash.svg";
import classes from "./Accounts.module.scss";

const KashAccount = ({ account, openModal }) => {
  return (
    <div className={classes.KashAccount}>
      <img src={KashIcon} alt="kash-icon" />
      <div className="md:ml-6 ml-3 text-right md:text-left">
        <h2>{!account.balance ? "No posees ningún KASH" : `¡Tienes ${account.balance} KASH!`}</h2>
        <p className="block md:hidden">
          <b>retiralos</b> o usalos en tus próximas <b>operaciones</b>.
        </p>
        <p className="md:w-9/12 md:block hidden">
          Puedes <b>retirar</b> tus <b>KASH</b> o usarlos en tus próximas <b>operaciones</b> de cambios de divisas.
        </p>
        <p className="text-sm font-bold mt-3">1 KASH = 1$ USD</p>
        <button onClick={() => openModal("kashInfo")}>¿Cómo ganar kash?</button>
        {account.balance > 0 && (
          <div className={classes.actionButtons}>
            <button className="action-button" onClick={() => openModal("withdrawal")}>
              Retirar mis kash
            </button>
            <Link className="action-button" to="/currency-exchange">
              Canjear mis kash
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default KashAccount;
