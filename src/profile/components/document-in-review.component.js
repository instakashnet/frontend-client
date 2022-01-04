import React from "react";
import { AccessTime } from "@material-ui/icons";

export const DocumentInReview = () => {
  return (
    <div className="text-center">
      <AccessTime style={{ fontSize: 60 }} htmlColor="#20a2a5" className="mb-3" />
      <h3>En revisión</h3>
      <p>En aproximadamente 5 minutos te enviaremos un correo electrónico con un mensaje para indicar el resultado de la verificación de tu identidad.</p>
    </div>
  );
};
