import React from "react";

import Arrows from "../../assets/images/arrows.svg";
import classes from "../../assets/css/exchange-components.module.scss";

const Swipe = ({ onSwipeCurrency, type }) => {
  return (
    <button type="button" className={`${classes.Swipe} ${type === "buy" ? classes.Rotate : ""}`} onClick={onSwipeCurrency}>
      <img src={Arrows} alt="arrows" />
    </button>
  );
};

export default React.memo(Swipe);
