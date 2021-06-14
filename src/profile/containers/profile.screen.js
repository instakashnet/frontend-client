import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal, getAccountsInit, disableProfileInit } from "../../store/actions";
import { useProfileInfo } from "../../shared/hooks/useProfileInfo";
import { ArrowDownCircle } from "react-feather";

import Accordion from "../../core/components/UI/accordion.component";
import PersonalInfo from "../components/personal-info.component";
import CompanyInfo from "../components/company-info.component";
import DocumentInfo from "../components/document-info.component";
import Layout from "../../core/components/layout/layout.component";
import ProgressBar from "../../core/components/UI/progress-bar.component";

// MODAL
import UploadFront from "../components/forms/upload/upload-front.component";
import UploadRear from "../components/forms/upload/upload-rear.component";

import classes from "../assets/css/profile-containers.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { profiles, user } = useSelector((state) => state.Profile);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));
  const { profileInfo, profileCompleted } = useProfileInfo(profiles, profileSelected);

  let InfoComponent = (props) => <PersonalInfo {...props} />;
  if (profileInfo.type === "juridica") InfoComponent = (props) => <CompanyInfo {...props} />;

  useEffect(() => {
    dispatch(getAccountsInit("kash"));
  }, [dispatch]);

  const openModalHandler = (type) => {
    let ModalComponent;

    if (type === "frontal") ModalComponent = () => <UploadFront />;
    if (type === "trasera") ModalComponent = () => <UploadRear />;

    dispatch(openModal(ModalComponent));
  };

  return (
    <Layout className={classes.ProfileInfoSection}>
      <div className={classes.ProfileInfoWrapper}>
        <h1>Mi perfil</h1>
        <p className="mb-4">Completa toda tu información de perfil para poder hacer operaciones mayores a 5mil USD.</p>
        <ProgressBar width={profileCompleted} />
        <Accordion defaultExpanded title="Datos básicos" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
          <InfoComponent profile={profileInfo} user={user} onDisable={() => dispatch(disableProfileInit(profileInfo.id))} />
        </Accordion>
        <Accordion defaultExpanded title="Documento de identidad" className={classes.AccordionTitle} Icon={ArrowDownCircle}>
          <DocumentInfo uploadFile={openModalHandler} profile={profileInfo} />
        </Accordion>
      </div>
    </Layout>
  );
};

export default Profile;
