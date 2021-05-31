import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAlert } from "../../../store/actions";

import classes from "./Alert.module.scss";

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.Alert);

  return alerts !== null && alerts.length > 0
    ? alerts.map((alert) => {
        const color = alert.type === "error" ? "red" : "green";
        const title = alert.type === "error" ? "Vaya, Hay un error" : "Exitoso";

        return (
          <div className={`bg-${color}-100 border-t-4 border-${color}-500 rounded-b text-${color}-900 px-2 py-2 shadow-md ${classes.Alert}`} role="alert" key={alert.id}>
            <div className="flex items-center">
              <div className="py-1">
                <svg className={`fill-current h-6 w-6 text-${color}-500 mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm lg:text-base">{alert.msg}</p>
              </div>
              <span className="ml-auto top-0 bottom-0 right-0 pl-4 py-2" onClick={() => dispatch(removeAlert(alert.id))}>
                <svg className={`fill-current h-6 w-6 text-${color}-500`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          </div>
        );
      })
    : null;
};

export default React.memo(Alert);
