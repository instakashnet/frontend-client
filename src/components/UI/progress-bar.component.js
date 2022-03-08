import React from "react";

import classes from "./modules/progress-bar.module.scss";

const ProgressBar = ({ width }) => {
  let color;

  if (width < 66) color = "#ff4b55";
  if (width >= 66 && width <= 99) color = "#F2C94C";
  if (width > 99) color = "#46E6AD";

  return (
    <div className={classes.ProgressBar}>
      <div className={classes.Filler} style={{ backgroundColor: color, width: `${width}%` }}>
        <span className={classes.ProgressCircle} style={{ backgroundColor: color, color: width < 66 || width > 99 ? "#fff" : "#0D8284" }}>
          {width}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
