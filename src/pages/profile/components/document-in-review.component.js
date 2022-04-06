import CircularProgress from "@material-ui/core/CircularProgress";
import { AccessAlarm } from "@material-ui/icons";
import React from "react";

import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";

export const DocumentInReview = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <div className="text-center max-w-3xl mx-auto">
      <AccessAlarm style={{ fontSize: isMobile ? 60 : 120 }} htmlColor="#20a2a5" className="mb-3" />
      <h1>Documento validándose</h1>
      <p className="mb-5">
        En este momento nos encontramos validando su identidad junto con su documento cargado. En aproximadamente 5 minutos le llegará un correo para indicarle el resultado de la
        verificación.
      </p>
      <CircularProgress size={50} color="primary" className="mr-2" />
    </div>
  );
};
