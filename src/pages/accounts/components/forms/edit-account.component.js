import React from "react";

// FORMIK
import { useFormik } from "formik";
import { editAccountValidation } from "../../helpers/validations";

// REACT REDUX
import { useDispatch, useSelector } from "react-redux";
import { editAccountInit } from "../../../../store/actions";

// COMPONENTS
import { Input } from "../../../../components/UI/form-items/input.component";
import { Button } from "../../../../components/UI/button.component";

const EditAccount = ({ account, cancelEdit, setEdit }) => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Accounts);
  const formik = useFormik({
    initialValues: { account_number: account.account_number, isDirect: !!account.account_number, cci: account.cci, alias: account.alias },
    enableReinitialize: true,
    validationSchema: editAccountValidation,
    onSubmit: (values) => dispatch(editAccountInit(account.id, values, setEdit)),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-full">
        {formik.values.isDirect ? (
          <Input
            name="account_number"
            label="Número de cuenta"
            value={formik.values.account_number}
            error={formik.errors.account_number}
            touched={formik.touched.account_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        ) : (
          <Input
            name="cci"
            label="Número de cuenta"
            value={formik.values.cci}
            error={formik.errors.cci}
            touched={formik.touched.cci}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}

        <Input
          name="alias"
          label="Alias de la cuenta"
          value={formik.values.alias}
          error={formik.errors.alias}
          touched={formik.touched.alias}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button mb-4 md:mb-0 ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Editar cuenta
          </Button>
          <Button className="secondary-button" type="button" onClick={cancelEdit}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};

export default React.memo(EditAccount);
