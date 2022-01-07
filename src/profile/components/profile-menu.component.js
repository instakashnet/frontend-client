import React from "react";
import { NavLink } from "react-router-dom";

// CLASSES
import classes from "../assets/css/profile-components.module.scss";

export const ProfileMenu = ({ match, className, level }) => {
  return (
    <nav className={`${classes.ProfileNav} ${className || ""}`}>
      <div className={classes.ProfileNavItems}>
        <div className={classes.NavItem}>
          <NavLink exact activeClassName={classes.Active} to={match.url}>
            <span>Datos básicos</span>
            <small>Nombre, Apellido, Teléfono y Correo</small>
          </NavLink>
          <div />
        </div>
        {level < 3 && (
          <div className={classes.NavItem}>
            <NavLink activeClassName={classes.Active} to={match.url + "/verify-identity"}>
              <span>Verificar identidad</span>
              <small>Debes verificar tu identidad</small>
            </NavLink>
            <div />
          </div>
        )}
        <div className={classes.NavItem}>
          <NavLink activeClassName={classes.Active} to={match.url + "/additionals"}>
            <span>Datos adicionales</span>
            <small>Fecha de nacimiento, Dirección, profesión y ocupación.</small>
          </NavLink>
          <div />
        </div>
        <div className={classes.NavItem}>
          <a href="https://instakash.net/faq" target="_blank" rel="noopener noreferrer">
            <span>Centro de ayuda</span>
          </a>
          <div />
        </div>
      </div>
    </nav>
  );
};
