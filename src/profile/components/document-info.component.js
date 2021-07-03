import React, { useState } from "react";
import { AlertTriangle } from "react-feather";
import { useDispatch } from "react-redux";
import { editProfileInit } from "../store/actions";
import UploadDocument from "./forms/upload-document.component";

import Switch from "../../core/components/UI/form-items/switch.component";

const DocumentDetails = ({ profile, isCompleted, isProcessing }) => {
  const dispatch = useDispatch();
  const [pep, setPep] = useState(profile.pep && profile.pep === "1" ? true : false);

  const onPepChange = (e) => {
    setPep(e.target.checked);
    const newProfileInfo = {
      profileId: profile.id,
      pep: e.target.checked,
    };
    dispatch(editProfileInit(newProfileInfo));
  };

  let incompletedMessage;
  if (!isCompleted.isRearPhoto && !isCompleted.isFrontPhoto) incompletedMessage = "No has subido tu documento.";
  if (!isCompleted.isRearPhoto && isCompleted.isFrontPhoto) incompletedMessage = "No has subido la foto trasera.";
  if (isCompleted.isRearPhoto && !isCompleted.isFrontPhoto) incompletedMessage = "No has subido la foto frontal.";

  return (
    <div className="w-full text-center mt-3">
      {profile.type === "juridica" && <p>Documento del representante legal.</p>}
      <div className="flex flex-col items-center justify-center mx-auto w-full">
        <UploadDocument type="frontal" profileId={profile.id} documentUrl={profile.identity_photo} />
        <UploadDocument type="trasera" profileId={profile.id} documentUrl={profile.identity_photo_two} />
      </div>
      {incompletedMessage && (
        <p className="error-msg flex items-center justify-center mb-4">
          <AlertTriangle className="mr-3" /> {incompletedMessage}
        </p>
      )}
      {profile.type === "natural" && <Switch name="pep" placeholder="¿Eres una persona políticamente expuesta?" value={pep} onChange={onPepChange} isProcessing={isProcessing} />}
    </div>
  );
};

export default DocumentDetails;
