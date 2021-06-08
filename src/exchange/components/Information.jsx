import React from "react";
import { isMobile } from "react-device-detect";

import Button from "../../core/components/UI/Button";

import InfoImg from "../images/exchange-user.png";
import Clock from "../images/icons/clock.svg";
import Arrows from "../images/icons/arrows.svg";
import User from "../images/icons/user.svg";
import Dollar from "../images/icons/dollar.svg";

import classes from "./Info.module.scss";

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
            <p>Ambas cuentas deben ser del titular.</p>
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
