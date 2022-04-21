import React from "react";
import Arrows from "../../assets/images/circular-arrows.svg";
import classes from "../modules/calculator-items/swipe.module.scss";


const Swipe = ({ onSwipeCurrency, type }) => {
  return (
    <button type="button" className={`${classes.Swipe} ${type === "buy" ? classes.Rotate : ""}`} onClick={onSwipeCurrency}>
      <span className={classes.SwipeMedium}>
        <img src={Arrows} alt="arrows" />
      </span>
    </button>
  );
};

export default React.memo(Swipe);
