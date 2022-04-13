import { GroupOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import history from "../../../shared/history";

// CLASSES
import classes from "./modules/selection-header.module.scss";

export const SelectionHeader = ({ profile }) => {
  useEffect(() => profile || history.push("/currency-exchange/profile-selection"), [profile]);

  return (
    <div className={classes.HeaderSelection}>
      <div className="flex flex-col items-start">
        <p className="capitalize">
          <b>Perfil:</b>{" "}
          {profile?.razon_social ? `${profile?.razon_social.substring(0, 20).toLowerCase()}${profile?.razon_social.length > 20 ? "..." : ""}` : profile?.first_name.toLowerCase()}
          <br />
        </p>
      </div>
      <Link to="/currency-exchange/profile-selection">
        <GroupOutlined htmlColor="#FFF" fontSize="small" /> Cambiar perfil
      </Link>
    </div>
  );
};
