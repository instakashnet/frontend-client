import React, { useEffect } from "react";
// REDUX
import { useDispatch,useSelector } from "react-redux";
// REACT ROUTER
import { Route } from "react-router-dom";

// COMPONENT
import Layout from "../../../components/layout/layout.component";
// HOOKS
import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";
import { useUserData } from "../../../shared/hooks/useProfileInfo";
// REDUX ACTIONS
import { closeSocketConnection,openSocketConnection } from "../../../store/actions";
// COMPONENTS
import { ProfileInfo } from "../components/profile-info.component";
import { ProfileMenu } from "../components/profile-menu.component";
// SCREENS
import { AdditionalInfoScreen } from "./additional-info.screen";
import { BasicInfoScreen } from "./basic-info.screen";
// CLASSES
import classes from "./modules/profile.screen.module.scss";
// SCREEN
import { VerifyIdentityScreen } from "./verify-identity.screen";

const Profile = ({ match, history }) => {
  const dispatch = useDispatch(),
    user = useSelector((state) => state.Auth.user),
    { completed, color } = useUserData(user),
    { isMobile } = useDeviceDetect();

  // EFFECTS
  useEffect(() => {
    dispatch(openSocketConnection("validation"));

    return () => {
      closeSocketConnection();
    };
  }, [dispatch]);

  return (
    <Layout>
      {isMobile && <ProfileMenu match={match} user={user} />}
      <div className={classes.ProfileWrapper}>
        <section className={classes.ProfileNavigation}>
          <ProfileInfo completed={completed} color={color} user={user} match={match} />
        </section>

        <section className={classes.ProfileSection}>
          <Route exact path={match.url}>
            <BasicInfoScreen user={user} />
          </Route>
          <Route exact path={match.url + "/verify-identity"}>
            <VerifyIdentityScreen user={user} history={history} />
          </Route>
          <Route exact path={match.url + "/additionals"}>
            <AdditionalInfoScreen user={user} />
          </Route>
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
