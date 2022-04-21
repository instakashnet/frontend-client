import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import Countdown from "react-countdown";
// CLASSES
import classes from "../modules/calculator-items/timer.module.scss";

const Timer = ({ onFinish }) => {
  // VARIABLES
  const time = 300000;
  const [timerId, setTimerId] = useState(0);
  const [countdown, setCountdown] = useState(Date.now() + time);

  // HANDLERS
  const renderer = ({ total, formatted: { minutes, seconds } }) => {
    const progressVal = (total * 100) / time;

    return (
      <>
        <CircularProgress color="inherit" className={classes.Progress} size={20} thickness={4.5} value={progressVal} variant="determinate" />
        <span className={classes.Time}>
          {minutes}:{seconds}
        </span>
      </>
    );
  };

  const onComplete = async () => {
    await onFinish();
    setCountdown(Date.now() + time);
    setTimerId((prev) => prev + 1);
  };

  return (
    <Countdown key={timerId} date={countdown} renderer={renderer} onComplete={onComplete} />
  );
};

export default React.memo(Timer);
