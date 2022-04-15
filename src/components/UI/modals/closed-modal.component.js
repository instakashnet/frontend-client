import React from "react";
import { Button } from "../button.component";
import classes from "../modules/modals/closed-modal.module.scss";

export const ClosedModal = ({ onClose }) => {
  return (
    <div className={classes.OutOfTimeBg}>
      <div className={classes.OutOfTimeWrapper}>
        <h1>¡Ingreso fuera de horario!</h1>
        <p className="mb-6">
          Estás ingresando fuera de nuestro horario laboral. Puedes registrar tus operaciones y transferir con normalidad, pero tu cambio se efectuará dentro del siguiente horario:
        </p>
        <p className="font-bold">Lunes a Domingo: 9AM a 9PM</p>
        <p className="font-bold">Feriados: cerrados</p>
        <Button className="action-button mt-8" onClick={onClose}>
          Lo entiendo
        </Button>
      </div>
    </div>
  );
};