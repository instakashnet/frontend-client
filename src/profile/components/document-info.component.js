import React, { useState } from "react";
import { Upload, FileText, Edit, AlertTriangle } from "react-feather";
import { useDispatch } from "react-redux";
import { editProfileInit } from "../store/actions";
import UploadDocument from "./forms/upload-document.component";

import Switch from "../../core/components/UI/form-items/switch.component";

import classes from "../assets/css/profile-components.module.scss";

const DocumentDetails = ({ profile, uploadFile }) => {
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
    <div className="w-full text-cente mt-3">
      {profile.type === "juridica" && <p>Datos del representante legal.</p>}
      <div className="flex flex-col items-center justify-center mx-auto w-full">
        {!profile.identity_photo ? (
          <UploadDocument type="frontal" />
        ) : (
          <div className={classes.DocumentFile}>
            <span>
              <FileText size={30} />
            </span>
            <h4>Parte frontal</h4>
            <button className="flex items-center mt-1" type="button" onClick={() => uploadFile("frontal")}>
              editar foto <Edit className="ml-1" size={15} />
            </button>
          </div>
        )}

        {!profile.identity_photo_two ? (
          <button className={classes.AddFile} type="button" onClick={() => uploadFile("trasera")}>
            <span>
              <Upload size={30} />
            </span>
            <h4>
              Cargar <b>parte trasera</b>
            </h4>
            <p>Formato .jpg o .png</p>
          </button>
        ) : (
          <div className={classes.DocumentFile}>
            <span>
              <FileText size={30} />
            </span>
            <h4>Parte trasera</h4>
            <button className="flex items-center mt-1" type="button" onClick={() => uploadFile("trasera")}>
              editar foto <Edit className="ml-1" size={15} />
            </button>
          </div>
        )}
      </div>
      {(!profile.identity_photo || !profile.identity_photo_two) && (
        <span className="error-msg justify-center mb-4">
          <AlertTriangle className="mr-3" /> No has subido tu documento.
        </span>
      )}
      <Switch name="pep" placeholder="¿Eres una persona políticamente expuesta?" value={pep} onChange={onPepChange} />
    </div>
  );
};

export default DocumentDetails;
