import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { ArrowDown } from "react-feather";

import AccountCard from "../components/AccountCard";

import classes from "./Accounts.module.scss";

const AccountsList = ({ accounts, openDetails }) => {
  let label;

  if (accounts.length > 0) label = `Cuentas ${accounts[0].currency.name} ${accounts[0].currency.Symbol}`;

  return (
    <Accordion className={classes.Accordion} defaultExpanded>
      <AccordionSummary expandIcon={<ArrowDown />} aria-controls="accounts" className={classes.AccordionSummary}>
        <h3>{label}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex items-center flex-wrap justify-start w-full">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} openModal={() => openDetails("details", account.id)} />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccountsList;
