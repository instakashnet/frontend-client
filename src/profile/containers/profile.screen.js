import React, { useState } from "react";
import { useUserData } from "../../shared/hooks/useProfileInfo";
import { ArrowDropDownCircle } from "@material-ui/icons";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import Layout from "../../components/layout/layout.component";

import classes from "../assets/css/profile-containers.module.scss";

const Profile = () => {
  const [edit, setEdit] = useState(false),
    { isProcessing } = useSelector((state) => state.Profile),
    { user } = useSelector((state) => state.Auth.user),
    { completed } = useUserData(user);

  return (
    <Layout className={classes.ProfileInfoSection}>
      <div className={classes.ProfileInfoWrapper}></div>
    </Layout>
  );
};

export default Profile;
