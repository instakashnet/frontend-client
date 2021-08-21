import React from "react";
import { isMobile } from "react-device-detect";

import { Button } from "../../components/UI/button.component";

import InfoImg from "../assets/images/exchange-user.png";
import Clock from "../assets/images/icons/clock.svg";
import Arrows from "../assets/images/icons/arrows.svg";
import User from "../assets/images/icons/user.svg";
import Dollar from "../assets/images/icons/dollar.svg";

import classes from "../assets/css/exchange-components.module.scss";

const Information = ({ onClose }) => {
  return (
    <div className={classes.Information}>
      <div className="flex items-end justify-center">
        <div className="flex items-end justify-center flex-wrap relative lg:flex-nowrap">
          <h3 className={classes.InfoTitle}>¡Importante!</h3>
          <div className={classes.InfoImgCard}>
            <img src={InfoImg} alt="information" />
          </div>
          <div className={classes.InfoCard}>
            <img src={Arrows} alt="arrows" />
            <p>
              Recibimos solo transferencias. <br /> No aceptamos depósitos.
            </p>
          </div>
          <div className={classes.InfoCard}>
            <img src={User} alt="clock" />
            <p>Debe registrar primero el pedido antes de hacer una transferencia a nuestras cuentas.</p>
          </div>
          <div className={classes.InfoCard}>
            <img src={Clock} alt="clock" />
            <p>Las transacciones se procesan entre 10 a 25 minutos.</p>
          </div>
          <div className={classes.InfoCard}>
            <img src={Dollar} alt="clock" />
            <p>Importes mayores de $10,000 pueden tardar más de lo usual.</p>
          </div>
        </div>
      </div>
      {isMobile && (
        <Button type="button" className="action-button" onClick={onClose}>
          Aceptar
        </Button>
      )}
    </div>
  );
};

export default Information;
