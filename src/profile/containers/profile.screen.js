import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { disableProfileInit } from "../../store/actions";
import { useProfileInfo } from "../../shared/hooks/useProfileInfo";
import { ArrowDownCircle } from "react-feather";

import Accordion from "../../core/components/UI/accordion.component";
import PersonalInfo from "../components/personal-info.component";
import CompanyInfo from "../components/company-info.component";
import DocumentInfo from "../components/document-info.component";
import EditAdditional from "../components/forms/edit-additionals.component";
import AdditionalInfo from "../components/additional-info.component";
import Layout from "../../core/components/layout/layout.component";
import ProgressBar from "../../core/components/UI/progress-bar.component";

import classes from "../assets/css/profile-containers.module.scss";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { user, isProcessing } = useSelector((state) => state.Profile);
  const { profileInfo, profileCompleted, isCompleted } = useProfileInfo();

  let InfoComponent = (props) => <PersonalInfo {...props} />;
  if (profileInfo.type === "juridica") InfoComponent = (props) => <CompanyInfo {...props} />;

  return (
    <Layout className={classes.ProfileInfoSection}>
      <div className={classes.ProfileInfoWrapper}>
        <h1>Mi perfil</h1>
        <p className="mb-4">Completa toda tu información de perfil para poder hacer operaciones mayores a 5mil USD.</p>
        <ProgressBar width={profileCompleted} />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 lg:mr-14 lg:mt-4">
            <Accordion defaultExpanded title="Datos básicos" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
              <InfoComponent profile={profileInfo} personalProfile={profileInfo} user={user} onDisable={() => dispatch(disableProfileInit(profileInfo.id))} />
            </Accordion>
            {profileInfo.type === "natural" && (
              <Accordion defaultExpanded title="Datos adicionales" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
                {edit ? <EditAdditional profile={profileInfo} onEdit={setEdit} /> : <AdditionalInfo profile={profileInfo} onEdit={setEdit} />}
              </Accordion>
            )}
          </div>
          <Accordion defaultExpanded title="Documento de identidad" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
            <DocumentInfo isCompleted={isCompleted} profile={profileInfo} isProcessing={isProcessing} />
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
