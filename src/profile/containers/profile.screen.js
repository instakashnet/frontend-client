import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccountsInit, disableProfileInit } from "../../store/actions";
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
  const { profiles, user } = useSelector((state) => state.Profile);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));
  const { profileCompleted } = useProfileInfo(profiles, profileSelected);

  let InfoComponent = (props) => <PersonalInfo {...props} />;
  if (profileSelected.type === "juridica") InfoComponent = (props) => <CompanyInfo {...props} />;

  useEffect(() => {
    dispatch(getAccountsInit("kash"));
  }, [dispatch]);

  return (
    <Layout className={classes.ProfileInfoSection}>
      <div className={classes.ProfileInfoWrapper}>
        <h1>Mi perfil</h1>
        <p className="mb-4">Completa toda tu información de perfil para poder hacer operaciones mayores a 5mil USD.</p>
        <ProgressBar width={profileCompleted} />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 lg:mr-14 lg:mt-4">
            <Accordion defaultExpanded title="Datos básicos" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
              <InfoComponent profile={profileSelected} user={user} onDisable={() => dispatch(disableProfileInit(profileSelected.id))} />
            </Accordion>
            <Accordion defaultExpanded title="Datos adicionales" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
              {edit ? <EditAdditional profile={profileSelected} onEdit={setEdit} /> : <AdditionalInfo profile={profileSelected} onEdit={setEdit} />}
            </Accordion>
          </div>
          <Accordion defaultExpanded title="Documento de identidad" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
            <DocumentInfo profile={profileSelected} />
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
