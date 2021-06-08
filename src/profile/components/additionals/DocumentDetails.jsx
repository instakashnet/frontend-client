import React from "react";
import { Edit, File } from "react-feather";

import classes from "./Details.module.scss";

const DocumentDetails = ({ profile, uploadFile }) => (
  <>
    <h3 className="mt-8">Documento de identidad</h3>
    <hr />

    <div className="flex items-center justify-center flex-wrap p-8">
      {!profile.identity_photo ? (
        <button className={classes.AddFile} type="button" onClick={() => uploadFile("frontal")}>
          Agregar foto frontal <Edit className="ml-2" size={20} />
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          <a href={profile.identity_photo} target="_blank" rel="noopener noreferrer" className={classes.DocumentFile}>
            <File size={40} />
            <p>Parte frontal</p>
          </a>
          <button className="flex items-center mt-3 p-2" type="button" onClick={() => uploadFile("frontal")}>
            Editar foto <Edit className="ml-2" size={20} />
          </button>
        </div>
      )}

      {!profile.identity_photo_two ? (
        <button className={classes.AddFile} type="button" onClick={() => uploadFile("trasera")}>
          Agregar foto trasera <Edit className="ml-2" size={20} />
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          <a href={profile.identity_photo_two} target="_blank" rel="noopener noreferrer" className={classes.DocumentFile}>
            <File size={40} />
            <p>Parte trasera</p>
          </a>
          <button className="flex items-center mt-3 p-2" type="button" onClick={() => uploadFile("trasera")}>
            Editar foto <Edit className="ml-2" size={20} />
          </button>
        </div>
      )}
    </div>
  </>
);

export default DocumentDetails;
