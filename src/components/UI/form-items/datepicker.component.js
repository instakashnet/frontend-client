import React from "react";
import moment from "moment";
import { FormControl, InputLabel } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";

import classes from "../modules/form/datepicker.module.scss";

moment.locale("es");

export const DatePickerInput = ({ value, onChange, placeholder, error, label, establishedInfo }) => {
  const maxDate = moment().subtract(18, "years").toDate();

  return (
    <FormControl classes={{ root: classes.FormControl }}>
      {label && <InputLabel>{label}</InputLabel>}
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
          className={`${classes.DateInput} ${!establishedInfo && classes.EmptyInput} ${value && error ? classes.DateError : ""}`}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
};
