import React from "react";
import { Remove, Check } from "@material-ui/icons";
import { CircleProgress } from "react-gradient-progress";
import CircularProgress from "@material-ui/core/CircularProgress";

// ASSETS
import MaleLight from "../../assets/images/profiles/male-light.svg";
import FemaleLight from "../../assets/images/profiles/female-light.svg";

// COMPONENTS
import { ProfileMenu } from "./profile-menu.component";

// CLASSES
import classes from "../assets/css/profile-components.module.scss";

export const ProfileInfo = ({ user, color, completed, match }) => {
  return (
    <>
      <div className={classes.ProfileInfoCard}>
        <div className="flex items-center justify-start lg:justify-center my-4">
          <img src={user.identitySex === "male" ? MaleLight : FemaleLight} alt="Profile" width={90} />
          <h2 className="ml-6">{user.name.split(" ")[0].toLowerCase() + " " + user.name.split(" ")[1].toLowerCase()}</h2>
        </div>
        <div className="flex items-center justify-start lg:justify-center my-4">
          <CircleProgress width={95} percentage={completed} fontSize="20px" strokeWidth={4} primaryColor={[color, color]} secondaryColor="#DDD" />
          <ul className="ml-3">
            <li>Perfil completados</li>
            <li style={{ color: user.phone ? "#20a2a5" : "#AFAFAF" }}>
              {user.phone ? (
                <>
                  <Check htmlColor="#20a2a5" /> Datos personales
                </>
              ) : (
                <>
                  <Remove htmlColor="#AFAFAF" /> Faltan datos personales
                </>
              )}
            </li>
            <li style={{ color: user.identityDocumentValidation === "success" ? "#20a2a5" : user.identityDocumentValidation === "pending" ? "#ffa755" : "#AFAFAF" }}>
              {user.identityDocumentValidation === "success" ? (
                <div className="flex items-center">
                  <Check htmlColor="#20a2a5" /> Idenitdad verificada
                </div>
              ) : user.identityDocumentValidation === "pending" ? (
                <div className="flex items-center">
                  <CircularProgress size={18} color="secondary" className="mr-2" /> Vertificando identidad
                </div>
              ) : (
                <div className="flex items-center">
                  <Remove htmlColor="#AFAFAF" /> Verifica tu identidad
                </div>
              )}
            </li>
            <li style={{ color: user.address && user.dateBirth ? "#20a2a5" : "#AFAFAF" }}>
              {user.address && user.dateBirth ? (
                <>
                  <Check htmlColor="#20a2a5" /> Datos adicionales
                </>
              ) : (
                <>
                  <Remove htmlColor="#AFAFAF" /> Faltan datos adicionales
                </>
              )}
            </li>
          </ul>
        </div>
        <div className="mt-6 mb-2 lg:text-center">
          <h3>Completa tu perfil para cambios ilimitados.</h3>
          <p>Tienes un límite menor a 1000 dólares por cambio.</p>
        </div>
      </div>
      <ProfileMenu match={match} className={classes.ProfileNavDesktop} user={user} />
    </>
  );
};
