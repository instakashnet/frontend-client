import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProfileInit, openModal, closeModal } from "../../store/actions";
import { AlertTriangle } from "react-feather";

import Layout from "../../core/components/layout/layout.component";
import SelectionCard from "../components/selection-card.component";
import Spinner from "../../core/components/UI/spinner.component";
import AddProfile from "../components/forms/add-profile.component";
import Button from "../../core/components/UI/button.component";

import classes from "../assets/css/profile-containers.module.scss";

const Selection = () => {
  const dispatch = useDispatch();
  const { isLoading, profiles } = useSelector((state) => state.Profile);

  const addProfileHandler = () => dispatch(openModal(AddProfile));

  useEffect(() => {
    let timeout;
    const isRead = sessionStorage.getItem("isRead");

    if (!isRead) {
      timeout = setTimeout(() => {
        dispatch(openModal(InfoModal));
      }, 600);
    }
    return () => timeout && clearTimeout(timeout);
  }, [dispatch]);

  return (
    <Layout>
      {isLoading && <Spinner screen />}
      {!isLoading && (
        <div className={classes.ProfileSelectionWrapper}>
          <h1 className="mb-1">¡Nos alegra que estés aqui!</h1>
          <h3>Selecciona el perfil que usarás hoy</h3>
          <div className="flex items-start flex-wrap justify-center mt-10">
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
          </div>
        </div>
      )}
    </Layout>
  );
};

export const InfoModal = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    sessionStorage.setItem("isRead", true);
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <AlertTriangle size={70} className="error-msg mb-4" />
      <h2>Estimado usuario</h2>
      <p>
        Queremos comunicarle que las plataformas para empresas de <b>Interbank</b> y <b>BCP</b> se encuentran con retrasos de conexión. Por tal motivo nuestras operaciones pueden
        demorar más de lo usual.
        <br />
        <span className="mt-4 inline-block font-bold">Agradecemos su comprensión.</span>
        <Button onClick={closeModalHandler} className="action-button">
          Lo entiendo
        </Button>
      </p>
    </div>
  );
};

export default Selection;
