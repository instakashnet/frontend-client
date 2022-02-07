import React from "react";
import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";
import { AccessAlarm } from "@material-ui/icons";

export const DocumentInReview = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <div className="text-center max-w-3xl mx-auto">
      <AccessAlarm style={{ fontSize: isMobile ? 60 : 120 }} htmlColor="#20a2a5" className="mb-3" />
      <h1>Documento Validandose</h1>
      <p className="mb-6">Su documentación se encuentra en proceso de validación. Pronto estará listo.</p>
      <h3>En revisión</h3>
      <p>Actualmente se encuentra en proceso de validación. En aproximadamente 5 minutos le llegará un correo para indicarle el resultado de la verificación.</p>
    </div>
  );
};
