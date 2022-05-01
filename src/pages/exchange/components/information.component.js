import React from "react";
// COMPONENT
import { Button } from "../../../components/UI/button.component";
// HOOK
import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";
// ASSETS & CLASSES
import InfoImg from "../assets/images/exchange-user.png";
import Arrows from "../assets/images/icons/arrows.svg";
import Dollar from "../assets/images/icons/dollar.svg";
import User from "../assets/images/icons/user.svg";
import classes from "./modules/information.module.scss";


const Information = ({ onClose }) => {
  const { isMobile } = useDeviceDetect();

  return (
    <div className={classes.Information}>
      <div className="flex items-end justify-center">
        <div className={`flex justify-center flex-wrap relative lg:flex-nowrap ${classes.InfoContainer}`}>
          <h3 className={classes.InfoTitle}>¡Importante!</h3>
          <div className={classes.InfoImgCard}>
            <img src={InfoImg} alt="information" />
          </div>
          <div className={classes.InfoCard}>
            <img src={Arrows} alt="arrows" />
            <p>Recibimos solo transferencias. No aceptamos depósitos.</p>
          </div>
          <div className={classes.InfoCard}>
            <img src={User} alt="user" />
            <p>La cuenta de origen debe ser del mismo titular que registra el cambio.</p>
          </div>
          <div className={classes.InfoCard}>
            <img src={Dollar} alt="dollar sign" />
            <p>Importes mayores de $10,000 pueden tardar más de lo usual.</p>
          </div>
        </div>
      </div>
      {isMobile && (
        <Button type="button" className="action-button mt-5 md:mt-0 md:mb-8" onClick={onClose}>
          Aceptar
        </Button>
      )}
    </div>
  );
};

export default Information;
