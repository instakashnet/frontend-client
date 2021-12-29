import { useEffect, useState } from "react";

// ASSETS
import Male from "../../assets/images/profiles/male.svg";
import Female from "../../assets/images/profiles/female.svg";

export const useUserData = (user) => {
  return { profileInfo: {}, completed: 33, color: "red", Avatar: Male };
};
