// COMPONENTS
import { Button } from "../../../components/UI/button.component";
// ASSETS
import BellIcon from "../assets/images/icons/bell.svg";
// CLASSES
import classes from "./modules/rates-timeout-modal.module.scss";

function UpdateRates({ onClose }) {
  return (
    <div className={`flex flex-col items-center justify-center pt-4 pb-1 mx-auto ${classes.Container}`}>
      <img src={BellIcon} alt="Ícono de campana" />
      <h2 className="mt-3 mb-2">¡Se acabó el tiempo!</h2>
      <p className="text-center mb-6 leading-5">Los 5 minutos de cambio garantizado han finalizado. El tipo de cambio se actualizará y puede haber variado.</p>
      <Button type="button" className={`action-button ${classes.Btn}`} onClick={onClose}>
        Aceptar
      </Button>
    </div>
  );
}

export default UpdateRates;
