import React from "react";

import InfoBox from "./info-box.component";

const PersonalDetails = ({ profile, user }) => (
  <div className="w-full">
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
      <InfoBox label="Nombre completo">{`${profile.first_name} ${profile.last_name}`}</InfoBox>
      <InfoBox label="Documento de identidad">{`${profile.document_type} ${profile.document_identification}`}</InfoBox>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
      <InfoBox label="Teléfono">{user.phone || "No posees un teléfono"}</InfoBox>
      <InfoBox label="Correo electrónico">{user.email}</InfoBox>
    </div>
    <p className="ml-3 mt-2 font-bold">* Si desea editar alguno de sus datos básicos, por favor contacte a soporte.</p>
  </div>
);

export default PersonalDetails;
