import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./navigation-components.module.scss";

const NavItem = ({ link, icon, label, ...rest }) => {
  return (
    <li>
      <NavLink exact to={link} className={classes.NavItem} activeClassName={classes.Active} {...rest}>
        <img src={icon} alt={link} className="mr-3" />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
