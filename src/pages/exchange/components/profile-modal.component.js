import React from "react";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";

// CLASSES
import classes from "./modules/profile-modal.module.scss";

const CompleteProfile = ({ onClose }) => {
  return (
    <div className={classes.CompleteProfile}>
      <h2 className="text-center">Completa tu perfil</h2>
      <p>
        Para realizar operaciones mayores a <b>$ 1,000</b> deberás:
      </p>
      <ul className="my-3">
        <li>
          Completar tu <b>información de perfil</b> al 100%.
        </li>
        <li>Verificar tu identidad.</li>
      </ul>
      <p className="text-center">
        Haz click en <b>completar mi perfil</b> para agregar tus datos.
      </p>

      <Button type="button" className="action-button" onClick={onClose}>
        Completar mi perfil
      </Button>
    </div>
  );
};

export default CompleteProfile;
