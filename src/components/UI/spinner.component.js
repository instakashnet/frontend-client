import React from "react";
import { HashLoader } from "react-spinners";

// CLASSES
import classes from "./modules/spinner.module.scss";

const Spinner = ({ loading }) => {
  return (
    <div className={classes.LoadingOverlay}>
      <div className="flex items-center flex-col justify-center">
        <HashLoader size={70} loading={loading} margin={4} color="#0d8284" />
        <p className="mt-4">Cargando...</p>
      </div>
    </div>
  );
};

export default Spinner;
