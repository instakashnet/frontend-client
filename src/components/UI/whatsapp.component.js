import React from "react";

import WhatsappImg from "../../assets/images/icons/whatsapp.svg";
import classes from "./ui-components.module.scss";

const Whatsapp = () => {
  return (
    <div className={classes.Whatsapp}>
      <span className="mr-2 hidden md:inline-block">927 013 800</span>
      <img src={WhatsappImg} className="md:w-6" alt="Whatsapp" />
    </div>
  );
};

export default Whatsapp;
