import React from "react";
import { Warning, Info } from "@material-ui/icons";

const InfoModal = ({ type, children }) => {
  let IconType;

  if (type === "alert") IconType = <Warning fontSize="large" className="error-msg mb-4" />;
  if (type === "info") IconType = <Info fontSize="large" />;

  return (
    <div>
      {IconType}
      <h2>Estimado usuario</h2>
      {children}
    </div>
  );
};

export default InfoModal;
