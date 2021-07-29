import React from "react";
import { ClipLoader } from "react-spinners";

import classes from "../../assets/css/auth-components.module.scss";

const Input = ({ placeholder, name, type, error, groupClass, isLoading, loadingPos, touched, icon, value, ...rest }) => {
  const Icon = icon;

  return (
    <div className={`${classes.FormGroup} ${groupClass || ""}`}>
      <div className={classes.InputGroup}>
        <input
          name={name}
          type={type}
          className={`border-b py-2 pl-2 pr-6 ${error && touched ? classes.Error : ""}`}
          placeholder={isLoading ? "Cargando..." : placeholder}
          value={isLoading ? "" : value}
          {...rest}
        />
        {!isLoading && <Icon size={20} />}
      </div>
      {isLoading && (
        <div className="input-spinner" style={{ ...loadingPos }}>
          <ClipLoader size={25} color="#20a2a5" />
        </div>
      )}
      {error && touched && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default Input;
