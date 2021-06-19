import React from "react";
import { Delete } from "react-feather";

import InfoBox from "./info-box.component";

const CompanyDetails = ({ profile, personalProfile, user, onDisable }) => (
  <div className="w-full">
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
      <InfoBox label="Razón social">{profile.razon_social}</InfoBox>
      <InfoBox label="RUC">{profile.ruc}</InfoBox>
    </div>

    <div className="flex items-center justify-center md:justify-end">
      <InfoBox label="Dirección fiscal">{profile.address}</InfoBox>
    </div>

    <div className="flex item-center justify-end ml-auto mt-2">
      <button type="button" onClick={() => onDisable(null)} style={{ color: "#ff4b55" }} className="flex underline font-bold items-center mr-3">
        Eliminar <Delete className="ml-2" size={18} />
      </button>
      {/* <button type="button" onClick={() => onEdit((prev) => !prev)} className="flex underline font-bold items-center">
        Editar datos <Edit className="ml-2" size={18} />
      </button> */}
    </div>

    <h3>Representante Legal</h3>
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
      <InfoBox label="Nombre completo">{`${personalProfile.first_name} ${personalProfile.last_name}`}</InfoBox>
      <InfoBox label="Documento de identidad">{`${personalProfile.document_type} ${personalProfile.document_identification}`}</InfoBox>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
      <InfoBox label="Teléfono">{user.phone || "No posees un teléfono"}</InfoBox>
      <InfoBox label="Correo electrónico">{user.email}</InfoBox>
    </div>
  </div>
);

export default CompanyDetails;
