import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProfileInit, openModal, closeModal } from "../../store/actions";

import Layout from "../../components/layout/layout.component";
import SelectionCard from "../components/selection-card.component";
import Spinner from "../../components/UI/spinner.component";
import AddProfile from "../components/forms/add-profile.component";
import { Button } from "../../components/UI/button.component";

import classes from "../assets/css/profile-containers.module.scss";

const Selection = () => {
  const dispatch = useDispatch();
  const { isLoading, profiles } = useSelector((state) => state.Profile);

  let ModalComponent = () => <ModalInformation isAlert alertType="warning" title="¡IMPORTANTE!" />;

  const addProfileHandler = () => {
    ModalComponent = () => <AddProfile title="Agregar empresa" />;
    dispatch(openModal(ModalComponent));
  };
  // useEffect(() => {
  //   let timeout;
  //   const isRead = sessionStorage.getItem("isRead");

  //   if (!isRead) {
  //     timeout = setTimeout(() => {
  //       dispatch(openModal(ModalComponent));
  //     }, 600);
  //   }
  //   return () => timeout && clearTimeout(timeout);
  // }, [dispatch]);

  return (
    <Layout>
      {isLoading && <Spinner screen />}
      {!isLoading && (
        <div className={classes.ProfileSelectionWrapper}>
          <h1 className="mb-1">¡Nos alegra que estés aqui!</h1>
          <h3>Selecciona el perfil que piensas usar hoy</h3>
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
        Gracias por la confianza, queremos informarle que en estos momentos la plataforma para empresas de <b>BCP</b> presenta problemas en su plataforma. Por tal movito las
        operaciones a <b>BCP</b> pueden demorar más de la usual. Estamos a la espera del banco que solucione a la brevedad posible.
      </p>
      <p className="mb-4 inline-block font-bold">Agradecemos su comprensión.</p>
      <Button onClick={closeModalHandler} className="action-button">
        Lo entiendo
      </Button>
    </div>
  );
};

export default Selection;
