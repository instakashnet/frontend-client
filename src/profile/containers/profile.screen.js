import React, { useState } from "react";
import { useUserData } from "../../shared/hooks/useProfileInfo";
import { ArrowDropDownCircle } from "@material-ui/icons";

// REDUX
import { useSelector } from "react-redux";

import Accordion from "../../components/UI/accordion.component";
import PersonalInfo from "../components/personal-info.component";
import DocumentInfo from "../components/document-info.component";
import EditAdditional from "../components/forms/edit-additionals.component";
import AdditionalInfo from "../components/additional-info.component";
import Layout from "../../components/layout/layout.component";
import ProgressBar from "../../components/UI/progress-bar.component";

import classes from "../assets/css/profile-containers.module.scss";

const Profile = () => {
  const [edit, setEdit] = useState(false),
    { isProcessing } = useSelector((state) => state.Profile),
    { user } = useSelector((state) => state.Auth.user),
    { completed } = useUserData();

  return (
    <Layout className={classes.ProfileInfoSection}>
      <div className={classes.ProfileInfoWrapper}>
        <h1>Mi perfil</h1>
        <p className="mb-4">Completa toda tu información de perfil para poder hacer operaciones mayores a 5mil USD.</p>
        <ProgressBar width={completed} />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 lg:mr-14 lg:mt-4">
            <Accordion defaultExpanded title="Datos básicos" className={classes.AccordionTitle} Icon={ArrowDropDownCircle}>
              <PersonalInfo profile={user} />
            </Accordion>
            <Accordion defaultExpanded title="Datos adicionales" className={classes.AccordionTitle} Icon={ArrowDropDownCircle}>
              {edit ? <EditAdditional profile={user} onEdit={setEdit} /> : <AdditionalInfo profile={user} onEdit={setEdit} />}
            </Accordion>
          </div>
          <Accordion defaultExpanded title="Documento de identidad" className={classes.AccordionTitle} Icon={ArrowDropDownCircle}>
            <DocumentInfo isCompleted profile={user} isProcessing={isProcessing} />
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
