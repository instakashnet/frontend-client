import { useEffect, useState } from "react";

// ASSETS
import MaleLight from "../../assets/images/profiles/male-light.svg";
import FemaleLight from "../../assets/images/profiles/female-light.svg";

export const useUserData = (user) => {
  const [completed, setCompleted] = useState(0);
  const [color, setColor] = useState("");
  const [Avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (
      (user.address && user.dateBbirth && user.identityDocumentValidation !== "success") ||
      (!user.address && !user.dateBbirth && user.identityDocumentValidation === "success")
    ) {
      setCompleted(66);
      setColor("#EB9824");
    } else if (user.address && user.dateBbirth && user.identityDocumentValidation === "success") {
      setCompleted(100);
      setColor("#F9F443");
    } else {
      setCompleted(33);
      setColor("#FF4B55");
    }

    setAvatar(user.identitySex === "male" ? MaleLight : FemaleLight);
  }, [user]);

  return { completed, color, Avatar };
};
