import React from "react";
import { Link } from "react-router-dom";
import { GroupOutlined } from "@material-ui/icons";

// CLASSES
import Classes from "../assets/css/exchange-components.module.scss";

export const SelectionHeader = ({ profile }) => {
  return (
    <div className={Classes.HeaderSelection}>
      <div className="flex flex-col items-start">
        <p className="capitalize">
          <b>Perfil:</b>{" "}
          {profile.razon_social ? `${profile.razon_social.substring(0, 17).toLowerCase()}${profile.razon_social.length > 17 ? "..." : ""}` : profile.first_name.toLowerCase()}
          <br />
        </p>
      </div>
      <Link to="/currency-exchange/profile-selection">
        <GroupOutlined htmlColor="#FFF" fontSize="small" /> Cambiar perfil
      </Link>
    </div>
  );
};
