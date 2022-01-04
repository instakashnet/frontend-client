import React from "react";
import { NavLink } from "react-router-dom";

// CLASSES
import classes from "../assets/css/profile-components.module.scss";

export const ProfileMenu = ({ match }) => {
  return (
    <nav className={classes.ProfileNav}>
      <div className={classes.ProfileNavItems}>
        <div className={classes.NavItem}>
          <NavLink exact activeClassName={classes.Active} to={match.url}>
            Datos básicos
          </NavLink>
          <div />
        </div>
        <div className={classes.NavItem}>
          <NavLink activeClassName={classes.Active} to={match.url + "/verify-identity"}>
            Verificar identidad
          </NavLink>
          <div />
        </div>
        <div className={classes.NavItem}>
          <NavLink activeClassName={classes.Active} to={match.url + "/additionals"}>
            Datos adicionales
          </NavLink>
          <div />
        </div>
        <div className={classes.NavItem}>
          <a href="https://instakash.net/faq" target="_blank" rel="noopener noreferrer">
            Centro de ayuda
          </a>
          <div />
        </div>
      </div>
    </nav>
  );
};
