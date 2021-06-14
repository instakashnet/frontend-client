import React from "react";
import { Upload, AlertTriangle } from "react-feather";

import classes from "../assets/css/profile-components.module.scss";

const DocumentDetails = ({ profile, uploadFile }) => (
  <div className="w-full text-center">
    {profile.type === "juridica" && <p>Datos del representante legal.</p>}
    <div className="flex flex-col items-center justify-center mx-auto w-full">
      {!profile.identity_photo ? (
        <button className={classes.AddFile} type="button" onClick={() => uploadFile("frontal")}>
          <span>
            <Upload size={35} />
          </span>
          <h4>
            Cargar <b>parte frontal</b>
          </h4>
          <p>Formato .jpg o .png</p>
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          {/*  <a href={profile.identity_photo} target="_blank" rel="noopener noreferrer" className={classes.DocumentFile}>
          <File size={40} />
          <p>Parte frontal</p>
        </a>
        <button className="flex items-center mt-3 p-2" type="button" onClick={() => uploadFile("frontal")}>
          Editar foto <Edit className="ml-2" size={20} />
        </button> */}
        </div>
      )}

      {!profile.identity_photo_two ? (
        <button className={classes.AddFile} type="button" onClick={() => uploadFile("trasera")}>
          <span>
            <Upload size={35} />
          </span>
          <h4>
            Cargar <b>parte trasera</b>
          </h4>
          <p>Formato .jpg o .png</p>
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          {/*  <a href={profile.identity_photo_two} target="_blank" rel="noopener noreferrer" className={classes.DocumentFile}>
          <File size={40} />
          <p>Parte trasera</p>
        </a>
        <button className="flex items-center mt-3 p-2" type="button" onClick={() => uploadFile("trasera")}>
          Editar foto <Edit className="ml-2" size={20} />
        </button> */}
        </div>
      )}
    </div>
    {(!profile.identity_photo || !profile.identity_photo_two) && (
      <span className="error-msg justify-center">
        <AlertTriangle className="mr-3" /> No has completado los datos.
      </span>
    )}
  </div>
);

export default DocumentDetails;
