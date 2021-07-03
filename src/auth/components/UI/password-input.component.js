import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";

import classes from "../../assets/css/auth-components.module.scss";

const Password = ({ name, placeholder, error, touched, ...rest }) => {
  const [type, setType] = useState("password");

  let Icon = Eye;

  if (type === "text") Icon = EyeOff;

  return (
    <div className={classes.FormGroup}>
      <div className={classes.InputGroup}>
        <input type={type} name={name} autoComplete="password" placeholder={placeholder} className={`border-b py-2 pl-2 pr-6 ${error && touched ? classes.Error : ""}`} {...rest} />
        <Icon size={20} onClick={() => setType((prevType) => (prevType === "password" ? "text" : "password"))} />
      </div>
      {error && touched && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default Password;
