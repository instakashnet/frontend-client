import React from "react";
import { ClipLoader } from "react-spinners";

import classes from "./Form.module.scss";

const Input = ({ type, name, value, label, placeholder, error, touched, isLoading, loadingPos, ...rest }) => {
  return (
    <div className={classes.FormGroup}>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={isLoading ? "" : value}
        placeholder={isLoading ? "Cargando..." : placeholder}
        className={error && touched ? classes.Error : ""}
        {...rest}
      />
      {error && touched && <p className="error-msg">{error}</p>}
      {isLoading && (
        <div className="input-spinner" style={{ ...loadingPos }}>
          <ClipLoader size={25} color="#20a2a5" />
        </div>
      )}
    </div>
  );
};

export default Input;
