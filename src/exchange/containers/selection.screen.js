import React, { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectProfileInit, getProfilesInit, openModal, closeModal } from "../../store/actions";

import SelectionCard from "../../profile/components/selection-card.component";
import Spinner from "../../components/UI/spinner.component";
import AddProfile from "../../profile/components/forms/add-profile.component";
import { Button } from "../../components/UI/button.component";

import classes from "../assets/css/exchange-screens.module.scss";

const Selection = () => {
  const dispatch = useDispatch(),
    { isLoading, profiles } = useSelector((state) => state.Profile);

  useEffect(() => {
    dispatch(getProfilesInit());
  }, [dispatch]);

  let ModalComponent = () => <ModalInformation isAlert alertType="warning" title="¡IMPORTANTE!" />;

  // HANDLERS
  const addProfileHandler = () => {
    ModalComponent = () => <AddProfile title="Agregar empresa" />;
    dispatch(openModal(ModalComponent));
  };

  return (
    <>
      <div className={classes.ProfileSelectionWrapper}>
        <h1 className="mb-1">Selecciona tu perfil</h1>
        <p>La selección de perfil nos permite saber que tipo de facturación deseas. Para una boleta continua con tu usuario, o si deseas una factura usa una de tus empresas.</p>
        <div className="flex items-start flex-wrap justify-center mt-10">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {profiles.map((profile) => (
                <SelectionCard
                  onClick={() => dispatch(selectProfileInit(profile.id))}
                  key={profile.id}
                  type={profile.type}
                  sex={profile.identity_sex}
                  name={profile.type === "natural" ? `${profile.first_name} ${profile.last_name}` : profile.razon_social}
                />
              ))}
              {profiles.length < 4 && <SelectionCard onClick={addProfileHandler} type="add" name="Agregar empresa" />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const ModalInformation = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    sessionStorage.setItem("isRead", true);
    dispatch(closeModal());
  };

  return (
    <div className="text-center">
      <h2>Estimado usuario</h2>
      <p className="my-3">
        Gracias por la confianza, queremos informarle que la plataforma de <b>Interbank</b> presneta problemas en su plataforma. Por tal motivo, no podremos realizar operaciones
        hacia este banco por el momento. A la espera de que el banco solucione en la brevedad posible.
      </p>
      <p className="mb-4 inline-block font-bold">Agradecemos su comprensión.</p>
      <Button onClick={closeModalHandler} className="action-button">
        Lo entiendo
      </Button>
    </div>
  );
};

export default Selection;