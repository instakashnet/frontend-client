import React from "react";
import moment from "moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";

import classes from "./form-items.module.scss";

moment.locale("es");

export const DatePickerInput = ({ value, onChange, placeholder, error, label }) => {
  const maxDate = moment().subtract(18, "years").toDate();

  return (
    <div className={classes.FormGroup}>
      {label && <label>{label}</label>}
      <MuiPickersUtilsProvider libInstance={moment} locale="es" utils={MomentUtils}>
        <DatePicker
          autoOk
          value={!value ? null : value}
          initialFocusedDate={maxDate}
          openTo="year"
          format="DD/MM/YYYY"
          onChange={onChange}
          views={["year", "month", "date"]}
          emptyLabel={placeholder}
          invalidDateMessage="Ingresa una fecha válida"
          invalidLabel="Ingresa una fecha válida"
          maxDate={maxDate}
          className={`${classes.DateInput} ${value && error ? classes.DateError : ""}`}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
