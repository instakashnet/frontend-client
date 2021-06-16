import React from "react";
import { ArrowDown } from "react-feather";

import Accordion from "../../core/components/UI/accordion.component";
import AccountCard from "./account-card.component";

import classes from "../assets/css/account-components.module.scss";

const AccountsList = ({ accounts, openDetails }) => {
  let label;

  if (accounts.length > 0) label = `Cuentas ${accounts[0].currency.name} ${accounts[0].currency.Symbol}`;

  return (
    <Accordion className={classes.AccordionSummary} Icon={ArrowDown} title={label} defaultExpanded>
      <div className="flex items-center flex-wrap justify-start w-full">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} openModal={() => openDetails("details", account.id)} />
        ))}
      </div>
    </Accordion>
  );
};

export default AccountsList;
