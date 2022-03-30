import { useEffect, useState } from "react";

// ASSETS
import FemaleLight from "../../assets/images/profiles/female-light.svg";
import MaleLight from "../../assets/images/profiles/male-light.svg";

export const useUserData = (user) => {
  const [completed, setCompleted] = useState(0);
  const [color, setColor] = useState("");
  const [Avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.level === 2) {
      setCompleted(66);
      setColor("#EB9824");
    } else if (user.level === 3) {
      setCompleted(100);
      setColor("#20a2a5");
    } else {
      setCompleted(33);
      setColor("#FF4B55");
    }

    setAvatar(user.identitySex === "male" ? MaleLight : FemaleLight);
  }, [user]);

  return { completed, color, Avatar };
};
