import React from "react";

import WhatsappImg from "../../assets/images/icons/whatsapp.svg";
import classes from "./modules/whatsapp.module.scss";

const Whatsapp = () => {
  return (
    <a href="https://wa.link/wekqza" target="_blank" className={classes.Whatsapp} rel="noopener noreferrer">
      <span className="mr-2 hidden md:inline-block">929 324 006</span>
      <img src={WhatsappImg} className="md:w-6" alt="Whatsapp" />
    </a>
  );
};

export default Whatsapp;
