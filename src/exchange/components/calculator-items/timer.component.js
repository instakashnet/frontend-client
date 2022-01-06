import React, { useState } from "react";
import Countdown from "react-countdown";

const Timer = ({ onFinish }) => {
  const [timerId, setTimerId] = useState(0);
  const [countdown, setCountdown] = useState(Date.now() + 300000);

  const renderer = ({ minutes, seconds }) => (
    <span>
      {minutes}:{`${seconds < 10 ? "0" : ""}${seconds}`}
    </span>
  );

  const onComplete = async () => {
    await onFinish();
    setCountdown(Date.now() + 300000);
    setTimerId((prev) => prev + 1);
  };

  return <Countdown key={timerId} date={countdown} renderer={renderer} onComplete={onComplete} />;
};

export default React.memo(Timer);
