import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProfileInit, openModal } from "../../store/actions";
import { AlertTriangle } from "react-feather";

import Layout from "../../core/components/layout/Layout";
import ProfileBox from "../components/SelectionBox";
import Spinner from "../../core/components/UI/Spinner";
import AddProfile from "./AddProfile";

import classes from "./Profile.module.scss";

const Selection = () => {
  const dispatch = useDispatch();
  const { isLoading, profiles } = useSelector((state) => state.Profile);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     dispatch(openModal(InfoModal));
  //   }, 600);
  //   return () => clearTimeout(timeout);
  // }, [dispatch]);

  const addProfileHandler = () => dispatch(openModal(AddProfile));

  return (
    <Layout>
      {isLoading && <Spinner screen />}
      {!isLoading && (
        <div className={classes.ProfileSelectionWrapper}>
          <h1 className="mb-1">¡Nos alegra que estés aqui!</h1>
          <h3>Selecciona el perfil que usarás hoy</h3>
          <div className="flex items-center flex-wrap justify-center mt-10">
            {profiles.map((profile) => (
              <ProfileBox
                onClick={() => dispatch(selectProfileInit(profile.id))}
                key={profile.id}
                type={profile.type}
                sex={profile.identity_sex}
                name={profile.type === "natural" ? `${profile.first_name} ${profile.last_name}` : profile.razon_social}
              />
            ))}
            {profiles.length < 4 && <ProfileBox onClick={addProfileHandler} type="add" name="Agregar empresa" />}
          </div>
        </div>
      )}
    </Layout>
  );
};

export const InfoModal = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <AlertTriangle size={70} className="error-msg mb-4" />
    <h2>Estimado usuario</h2>
    <p>
      Le informamos que en estos momentos las plataformas para empresas de <b>BCP</b> y <b>Interbank</b> se encuentra inhabilitadas por actualizaciones en sus plataforma. Por tal
      motivo, toda operación ingresada a partir de este momento será atendida el dia Lunes. <br />
      <span className="mt-4 inline-block font-bold">Agradecemos su comprensión.</span>
    </p>
  </div>
);

export default Selection;
