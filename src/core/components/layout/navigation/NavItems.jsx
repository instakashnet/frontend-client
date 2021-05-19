import React from 'react';

import NavItem from './NavItem';

import DashboardIcon from '../../../assets/images/icons/dashboard.svg';
import ExchangeIcon from '../../../assets/images/icons/exchange.svg';
import AccountsIcon from '../../../assets/images/icons/accounts.svg';

const NavItems = () => {
  return (
    <nav className='w-full mt-10 mb-12'>
      <ul>
        <NavItem link='/dashboard' icon={DashboardIcon} label='Mi actividad' />
        <NavItem exact link='/currency-exchange' icon={ExchangeIcon} label='Cambio de divisas' />
        <NavItem exact link='/my-accounts' icon={AccountsIcon} label='Mis cuentas' />
      </ul>
    </nav>
  );
};

export default NavItems;
