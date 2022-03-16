import React, { useEffect } from "react";
import { Route } from "react-router-dom";

// HOOKS
import { useUserData } from "../../../shared/hooks/useProfileInfo";
import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { openSocketConnection, closeSocketConnection } from "../../../store/actions";

// COMPONENTS
import Layout from "../../../components/layout/layout.component";
import { ProfileMenu } from "../components/profile-menu.component";
import { ProfileInfo } from "../components/profile-info.component";

// SCREENS
import { BasicInfoScreen } from "./basic-info.screen";
import { VerifyIdentityScreen } from "./verify-identity.screen";
import { AdditionalInfoScreen } from "./additional-info.screen";

// CLASSES
import classes from "./modules/profile.screen.module.scss";

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
