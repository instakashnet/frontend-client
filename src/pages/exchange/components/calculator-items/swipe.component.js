import React from "react";

import Arrows from "../../assets/images/arrows.svg";
import classes from "../modules/calculator-items/swipe.module.scss";

const Swipe = ({ onSwipeCurrency, type }) => {
  return (
    <button type="button" className={`${classes.Swipe} ${type === "buy" ? classes.Rotate : ""}`} onClick={onSwipeCurrency}>
      <img src={Arrows} alt="arrows" />
    </button>
  );
};

export default React.memo(Swipe);
