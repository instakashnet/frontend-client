import React, { useState, useEffect } from "react";
import { Check, Clear } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

// COMPONENTS
import { Input } from "../../../components/UI/form-items/input.component";
import { DatePickerInput } from "../../../components/UI/form-items/datepicker.component";

// CLASSES
import classes from "../assets/css/profile-components.module.scss";

export const InfoItem = ({ label, item, value, edit, name, onChange, error, touched, isProcessing, onSubmit, submitted }) => {
  const [editActive, setEditActive] = useState(false);

  useEffect(() => {
    if (submitted) setEditActive(false);
  }, [submitted]);

  return (
    <div className={classes.InfoItem}>
      {!editActive ? (
        <>
          <h4>{label}</h4>
          <div className="flex items-center justify-between">
            <p>{item}</p>
            {edit && <button onClick={() => setEditActive(true)}>Editar</button>}
          </div>
        </>
      ) : (
        <div className={classes.EditInputWrapper}>
          {name === "date_birth" ? (
            <DatePickerInput value={new Date(value)} onChange={onChange} error={error} establishedInfo />
          ) : (
            <Input name={name} value={value} onChange={onChange} error={error} touched={touched} />
          )}
          <div className={classes.EditButtons}>
            {isProcessing ? (
              <CircularProgress size={17} color="primary" className="mt-1 mr-1" />
            ) : (
              <>
                <button type="button" onClick={() => setEditActive(false)} className="mr-1">
                  <Clear fontSize="medium" htmlColor="#FF4B55" />
                </button>
                <button type="button" onClick={onSubmit}>
                  <Check fontSize="medium" htmlColor="#0D8284" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
