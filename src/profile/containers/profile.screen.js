import React, { useEffect } from "react";
import { useUserData } from "../../shared/hooks/useProfileInfo";
import { Remove, Check } from "@material-ui/icons";
import { CircleProgress } from "react-gradient-progress";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../store/actions";

// ASSETS
import MaleLight from "../../assets/images/profiles/male-light.svg";
import FemaleLight from "../../assets/images/profiles/female-light.svg";

// COMPONENTS
import Layout from "../../components/layout/layout.component";
import Card from "../../components/UI/card.component";
import { ProfileMenu } from "../components/profile-menu.component";

// SCREENS
import { BasicInfoScreen } from "./basic-info.screen";
import { VerifyIdentityScreen } from "./verify-identity.screen";
import { AdditionalInfoScreen } from "./additional-info.screen";

import classes from "../assets/css/profile-containers.module.scss";

const Profile = ({ match }) => {
  const dispatch = useDispatch(),
    user = useSelector((state) => state.Auth.user),
    { completed, color } = useUserData(user);

  // EFFECTS
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Layout className={classes.ProfileInfoSection}>
      <ProfileMenu match={match} />
      <div className={classes.ProfileWrapper}>
        <Card className={classes.ProfileInfoCard}>
          <div className="flex items-center justify-start my-4">
            <img src={user.identitySex === "male" ? MaleLight : FemaleLight} alt="Profile" width={90} />
            <h2 className="ml-6">{user.name.split(" ")[0].toLowerCase() + " " + user.name.split(" ")[1].toLowerCase()}</h2>
          </div>
          <div className="flex items-center justify-start my-4">
            <CircleProgress width={95} percentage={completed} fontSize="20px" strokeWidth={4} primaryColor={[color, color]} secondaryColor="#DDD" />
            <ul className="ml-3">
              <li>Perfil completados</li>
              <li style={{ color: user.name && user.phone ? "#20a2a5" : "#AFAFAF" }}>
                {user.name && user.phone ? (
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
          <div className="mt-6 mb-2">
            <h3>Completa tu perfil para cambios ilimitados.</h3>
            <p>Tienes un límite menor a 5000 dólares por cambio.</p>
          </div>
        </Card>
        <Route exact path={match.url}>
          <BasicInfoScreen user={user} />
        </Route>
        <Route exact path={match.url + "/verify-identity"}>
          <VerifyIdentityScreen user={user} />
        </Route>
        <Route exact path={match.url + "/additionals"}>
          <AdditionalInfoScreen user={user} />
        </Route>
      </div>
    </Layout>
  );
};

export default Profile;
