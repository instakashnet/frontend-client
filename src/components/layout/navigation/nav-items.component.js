import React from "react";

import NavItem from "./nav-item.component";

import HomeIcon from "../../../assets/images/icons/home.svg";
import DashboardIcon from "../../../assets/images/icons/dashboard.svg";
import ExchangeIcon from "../../../assets/images/icons/exchange.svg";
import AccountsIcon from "../../../assets/images/icons/accounts.svg";
import TrophyIcon from "../../../assets/images/icons/trophy.svg";

const NavItems = () => {
  return (
    <nav className="w-full mt-6 md:mt-20 mb-12">
      <ul>
        <NavItem link="/" icon={HomeIcon} label="Inicio" />
        <NavItem link="/dashboard/recent" icon={DashboardIcon} label="Mi actividad" />
        <NavItem exact link="/currency-exchange" icon={ExchangeIcon} label="Cambiar dólares" />
        <NavItem exact link="/my-accounts" icon={AccountsIcon} label="Mis cuentas" />
        <NavItem exact link="/affiliate-program" icon={TrophyIcon} label="Recomienda y gana" />
      </ul>
    </nav>
  );
};

export default NavItems;
