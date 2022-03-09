import React from "react";
import { PlusCircle } from "react-feather";

import classes from "../modules/form/inline_upload-input.module.scss";

const UploadInput = ({ value, name, error, accept, ...rest }) => {
  return (
    <>
      <div className={`${classes.FormGroup}`}>
        <input type="file" accept={accept} id={name} name={name} {...rest} />
        <label className="flex items-center justify-between" htmlFor={name}>
          <span>{value ? value.name : "Carga el documento (solo jpg/png)"}</span>
          <PlusCircle />
        </label>
      </div>
      {error && <p className="error-msg text-left">{error}</p>}
    </>
  );
};

export default UploadInput;
