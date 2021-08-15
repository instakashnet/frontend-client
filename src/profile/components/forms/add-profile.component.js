import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addProfileInit } from "../../../store/actions";
import { AllowOnlyNumbers } from "../../../shared/functions";
import { addProfileValidation } from "../../helpers/validations";

import { Input } from "../../../components/UI/form-items/input.component";
import { CheckboxComponent } from "../../../components/UI/form-items/checkbox.component";
import { Button } from "../../../components/UI/button.component";

const AddProfile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [invalidRuc, setInvalidRuc] = useState(null);
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({
    initialValues: { type: "juridica", razon_social: "", ruc: "", address: "", accept: false },
    validationSchema: addProfileValidation,
    onSubmit: (values) => dispatch(addProfileInit(values)),
  });
  const { setFieldValue } = formik;
  const { ruc } = formik.values;

  useEffect(() => {
    if (ruc.length === 11) {
      const validateRuc = async () => {
        setIsLoading(true);

        try {
          const res = await axios.post("https://api.migo.pe/api/v1/ruc", { token: process.env.REACT_APP_MIGO_API, ruc });
          if (res.status === 200) {
            setFieldValue("razon_social", res.data.nombre_o_razon_social);
            setInvalidRuc(null);
          }
        } catch (error) {
          console.log(error);
          setInvalidRuc("El RUC ingresado no se ha podido verificar. Por favor revise sus datos.");
          setFieldValue("razon_social", "");
        } finally {
          setIsLoading(false);
        }
      };
      validateRuc();
    } else {
      setInvalidRuc(null);
      setFieldValue("razon_social", "");
    }
  }, [ruc, setFieldValue]);

  const onRucChangeHandler = (e) => (AllowOnlyNumbers(e.target.value) ? setFieldValue("ruc", e.target.value) : false);

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
      <h2 className="text-center mt-4">Agrega tu perfil de empresa</h2>
      <Input
        type="text"
        name="ruc"
        label="Ingresa el RUC de tu empresa"
        value={formik.values.ruc}
        onChange={onRucChangeHandler}
        onBlur={onRucChangeHandler}
        error={formik.errors.ruc}
        touched={formik.touched.ruc}
      />
      {invalidRuc && <p className="error-msg">{invalidRuc}</p>}
      <Input
        type="text"
        name="razon_social"
        value={formik.values.razon_social}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.razon_social}
        touched={formik.touched.razon_social}
        isLoading={isLoading}
        disabled={isLoading}
        loadingPos={{ top: 10 }}
      />
      <Input
        type="text"
        name="address"
        label="Dirección fiscal de la empresa"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.address}
        touched={formik.touched.address}
      />
      <CheckboxComponent name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
        Declaro que soy el representante legal de la empresa.
      </CheckboxComponent>
      <Button type="submit" className={`ld-ext-right self-center action-button ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || invalidRuc || isProcessing}>
        <span className="ld ld-ring ld-spin" />
        Agregar empresa
      </Button>
    </form>
  );
};

export default AddProfile;
