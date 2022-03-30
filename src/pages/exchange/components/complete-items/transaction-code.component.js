import { Info } from "@material-ui/icons";
// FORMIK
import { useFormik } from "formik";
import React, { useState } from "react";

// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
import { Input } from "../../../../components/UI/form-items/input.component";
import { MuiAlert } from "../../../../components/UI/mui-alert.component";
import Tooltip from "../../../../components/UI/tooltip.component";
// REDUX ACTIONS
import { cancelExchangeInit,processCodeInit } from "../../../../store/actions";
// HELPER
import { transferCodeValidation } from "../../helpers/validations";

export const TransactionCode = ({ isProcessing, dispatch, order }) => {
  const [showInfo, setShowInfo] = useState(false);

  const formik = useFormik({
    initialValues: { transaction_code: "" },
    enableReinitialize: true,
    validationSchema: transferCodeValidation,
    onSubmit: (values) => dispatch(processCodeInit(values, order.id)),
  });

  return (
    <>
      <div className="flex items-center justify-end mb-3">
        <span className="text-sm font-bold cursor-pointer underline">¿Dónde lo encuentro?</span>
        <Tooltip
          title={<img src={`${process.env.PUBLIC_URL}/images/samples/transfer-${order.bankFromName.toLowerCase()}.png`} alt="ejemplo de transferencia" />}
          placement="top-start"
          disableHoverListener
          onMouseEnter={() => setShowInfo(true)}
          onClick={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          open={showInfo}
        >
          <Info className="ml-2" />
        </Tooltip>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="transaction_code"
          label="Ingresa el nro. de operación"
          value={formik.values.transaction_code}
          error={formik.errors.transaction_code}
          touched={formik.touched.transaction_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <MuiAlert type="info" opened>
          <span className="block  font-bold text-left">Solo posees 15 minutos para enviarnos el nro. de tu operación.</span>
        </MuiAlert>
        <div className="flex flex-col justify-center items-center">
          <Button type="submit" className={`action-button mt-6 ld-over ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            Completar cambio
          </Button>
          <Button type="button" className="secondary-button mt-6" onClick={() => dispatch(cancelExchangeInit(order.id, "complete"))}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};
