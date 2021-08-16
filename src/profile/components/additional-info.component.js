import React from "react";
import moment from "moment";
import { Edit, Warning } from "@material-ui/icons";

import InfoBox from "./info-box.component";

const PersonalDetails = ({ profile, onEdit }) => {
  let completed = true;

  if (!profile.date_birth || !profile.address || !profile.job || !profile.profession) completed = false;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <InfoBox label="Fecha de nacimiento">{profile.date_birth ? moment(profile.date_birth).format("DD/MM/YYYY") : "Sin fecha de nacimiento"}</InfoBox>
        <InfoBox label="Dirección">{profile.address ? profile.address.substring(0, 100) : "Sin dirección"}</InfoBox>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <InfoBox label="Ocupación">{profile.job || "Sin ocupación"}</InfoBox>
        <InfoBox label="Profesión">{profile.profession || "Sin profesión"}</InfoBox>
      </div>
      <button type="button" onClick={() => onEdit((prev) => !prev)} className="flex mt-3 ml-auto underline font-bold items-center">
        Editar datos <Edit className="ml-2" size={18} />
      </button>

      {!completed && (
        <p className="error-msg flex items-center justify-center mb-4">
          <Warning className="mr-3" /> No has completado los datos.
        </p>
      )}
    </div>
  );
};

export default PersonalDetails;
