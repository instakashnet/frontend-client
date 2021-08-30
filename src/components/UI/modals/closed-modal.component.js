import React from "react";
import { Button } from "../button.component";

import classes from "./modal-components.module.scss";

const OutOfTime = ({ onClose }) => {
  return (
    <main className={`h-screen ${classes.OutOfTimeBg}`}>
      <div className={classes.OutOfTimeWrapper}>
        <h1>¡Ingreso fuera de horario!</h1>
        <p className="mb-6">
          Estás ingresando fuera de nuestro horario laboral. Puedes registrar tus operaciones y transferir con normalidad, pero tu cambio se efectuará dentro del siguiente horario:
        </p>
        <p className="font-bold">Lunes a Viernes: 9AM a 7PM</p>
        <p className="font-bold">Sábados: 9AM a 2:30PM</p>
        <Button className="action-button mt-8" onClick={onClose}>
          Lo entiendo
        </Button>
      </div>
    </main>
  );
};

export default OutOfTime;
