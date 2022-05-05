import { InfoOutlined } from "@material-ui/icons";
// FORMIK
import { useFormik } from "formik";
import React, { useState } from "react";
// SWEET ALERT
import Swal from "sweetalert2";
// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
import { Input } from "../../../../components/UI/form-items/input.component";
import Tooltip from "../../../../components/UI/tooltip.component";
// REDUX ACTIONS
import { cancelExchangeInit, processCodeInit } from "../../../../store/actions";
// HELPER
import { transferCodeValidation } from "../../helpers/validations";

export const TransactionCode = ({ isProcessing, dispatch, order }) => {
  const [showInfo, setShowInfo] = useState(false);

  const formik = useFormik({
    initialValues: { transaction_code: "" },
    enableReinitialize: true,
    validationSchema: transferCodeValidation,
    onSubmit: async (values) => {
      let result = await Swal.fire({
        icon: "question",
        title: `¿${values.transaction_code} es el número de operación correcto?`,
        text: "Después de continuar no podrás modificarlo.",
        showCancelButton: true,
        cancelButtonColor: "#ffeb4d",
        confirmButtonColor: "#ff4b55",
        confirmButtonText: "Continuar",
        cancelButtonText: "Regresar",
      });

      if (result.isConfirmed) {
        dispatch(processCodeInit(values, order.id));
      } else return;
    },
  });

  return (
    <>
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
        <div className="flex items-center mb-3">
          <span className="text-sm">¿Dónde lo encuentro?</span>
          <Tooltip
            title={<img src={`${process.env.PUBLIC_URL}/images/samples/transfer-${order.bankFromName.toLowerCase()}.png`} alt="ejemplo de transferencia" />}
            placement="top-start"
            disableHoverListener
            onMouseEnter={() => setShowInfo(true)}
            onClick={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            open={showInfo}
          >
            <InfoOutlined className="ml-1 cursor-pointer" htmlColor="#20a2a5" />
          </Tooltip>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <Button type="submit" className={`action-button ld-over ${isProcessing ? "running" : ""} m-3 lg:order-2`} disabled={!formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            Completar cambio
          </Button>
          <Button type="button" className="secondary-button m-3" onClick={() => dispatch(cancelExchangeInit(order.id, "complete"))}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};
