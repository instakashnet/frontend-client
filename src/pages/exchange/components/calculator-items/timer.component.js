import { Box, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import Countdown from "react-countdown";
// CLASSES
import classes from "../modules/calculator-items/timer.module.scss";

const Timer = ({ onFinish, time }) => {
  // VARIABLES
  const [timerId, setTimerId] = useState(0),
    [countdown, setCountdown] = useState(Date.now() + time);

  const progressStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "6px",
  };

  // HANDLERS
  const renderer = ({ total, formatted: { minutes, seconds } }) => {
    const progressVal = (total * 100) / time;

    return (
      <>
        <Box sx={progressStyles}>
          <CircularProgress color="inherit" className={classes.BackgroundProgress} size={20} thickness={4.5} value={100} variant="determinate" />
          <CircularProgress color="inherit" className={classes.Progress} size={20} thickness={4.5} value={progressVal} variant="determinate" />
        </Box>
        <span className={classes.Time}>
          {minutes}:{seconds}
        </span>
      </>
    );
  };

  const completeHandler = async () => {
    await onFinish();
    setCountdown(Date.now() + time);
    setTimerId((prev) => prev + 1);
  };

  return (
    <div className="flex items-center text-base font-bold">
      <Countdown key={timerId} date={countdown} renderer={renderer} onComplete={completeHandler} />
    </div>
  );
};

export default React.memo(Timer);
