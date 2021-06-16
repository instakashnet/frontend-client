import React, { useState } from "react";
import { AlertTriangle } from "react-feather";
import { useDispatch } from "react-redux";
import { editProfileInit } from "../store/actions";
import UploadDocument from "./forms/upload-document.component";

import Switch from "../../core/components/UI/form-items/switch.component";

const DocumentDetails = ({ profile, isProcessing }) => {
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

  return (
    <div className="w-full text-center mt-3">
      {profile.type === "juridica" && <p>Documento del representante legal.</p>}
      <div className="flex flex-col items-center justify-center mx-auto w-full">
        <UploadDocument type="frontal" documentUrl={profile.identity_photo} />
        <UploadDocument type="trasera" documentUrl={profile.identity_photo_two} />
      </div>
      {(!profile.identity_photo || !profile.identity_photo_two) && (
        <span className="error-msg justify-center mb-4">
          <AlertTriangle className="mr-3" /> No has subido el documento.
        </span>
      )}
      {profile.type === "natural" && <Switch name="pep" placeholder="¿Eres una persona políticamente expuesta?" value={pep} onChange={onPepChange} isProcessing={isProcessing} />}
    </div>
  );
};

export default DocumentDetails;