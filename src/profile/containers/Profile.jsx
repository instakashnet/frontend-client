import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal, getAccountsInit, disableProfileInit } from "../../store/actions";
import { useProfileInfo } from "../../shared/hooks/useProfileInfo";

import PersonalDetails from "../components/additionals/PersonalDetails";
import CompanyDetails from "../components/additionals/CompanyDetails";
import DocumentDetails from "../components/additionals/DocumentDetails";
import EditPersonalProfile from "./EditPersonalProfile";
import EditCompanyProfile from "./EditCompanyProfile";
import Layout from "../../core/components/layout/Layout";
import ProgressBar from "../../core/components/UI/ProgressBar";

// MODAL
import Upload1 from "./upload/Upload1";
import Upload2 from "./upload/Upload2";
import KashInfo from "../../core/containers/KashInfo";

import classes from "./Profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editType, setEditType] = useState("");
  const { profiles, user } = useSelector((state) => state.Profile);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));
  const { profileInfo, profileCompleted } = useProfileInfo(profiles, profileSelected);

  useEffect(() => {
    dispatch(getAccountsInit("kash"));
  }, [dispatch]);

  const setEdit = (type) => {
    setIsEdit(true);
    setEditType(type);
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setEditType("");
  };

  const openModalHandler = (type) => {
    let ModalComponent;

    if (type === "frontal") ModalComponent = () => <Upload1 />;
    if (type === "trasera") ModalComponent = () => <Upload2 />;
    if (type === "kash") ModalComponent = () => <KashInfo />;

    dispatch(openModal(ModalComponent));
  };

  return (
    <Layout className="content-start">
      {isEdit ? (
        editType === "personal" ? (
          <EditPersonalProfile onCancelEdit={cancelEdit} profile={profileInfo} />
        ) : (
          <EditCompanyProfile onCancelEdit={cancelEdit} profile={profileInfo} />
        )
      ) : (
        <div className={classes.ProfileInfoWrapper}>
          <div className="flex items-center justify-between">
            <h1>Mi perfil</h1>
            <p className={classes.Percentage}>{profileCompleted}% completado</p>
          </div>
          <ProgressBar width={profileCompleted} />
          {profileInfo.type === "natural" ? (
            <PersonalDetails profile={profileInfo} user={user} onEdit={setEdit} />
          ) : (
            <CompanyDetails profile={profileInfo} onEdit={setEdit} onDisable={() => dispatch(disableProfileInit(profileInfo.id))} />
          )}
          <DocumentDetails uploadFile={openModalHandler} profile={profileInfo} />
        </div>
      )}
    </Layout>
  );
};

export default Profile;
