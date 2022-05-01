import cls from "classnames";
import React, { useEffect, useState } from "react";
import classes from "./modules/steps.module.scss";

export const Steps = ({ location }) => {
  const [activeNumber, setActiveNumber] = useState(1);

  useEffect(() => {
    if (location.includes("step-2")) setActiveNumber(1);
    if (location.includes("complete")) setActiveNumber(2);
    if (location.includes("transfer-code")) setActiveNumber(3);
  }, [location]);

  return (
    <div className={cls(classes.StepsWrapper, classes[`Progress${activeNumber}`])}>
      <div className={cls(classes.StepItem, activeNumber > 0 ? classes.Active : "")}>
        <p>Selecciona</p>
        <span>1</span>
      </div>
      <div className={cls(classes.StepItem, activeNumber > 1 ? classes.Active : "")}>
        <p>Transfiere</p>
        <span>2</span>
      </div>
      <div className={cls(classes.StepItem, activeNumber > 2 ? classes.Active : "")}>
        <p>Confirma</p>
        <span>3</span>
      </div>
    </div>
  );
};
