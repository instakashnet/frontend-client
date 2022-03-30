import { ArrowDropDown } from "@material-ui/icons";
import React from "react";

// COMPONENTS
import Accordion from "../../../components/UI/accordion.component";
import AccountCard from "./account-card.component";
// CLASSES
import classes from "./modules/accounts-list.module.scss";

const AccountsList = ({ accounts, openDetails }) => {
  let label;

  if (accounts.length > 0) label = `Cuentas ${accounts[0].currency.name} ${accounts[0].currency.Symbol}`;

  return (
    <Accordion className={classes.AccordionSummary} Icon={ArrowDropDown} title={label} defaultExpanded>
      <div className="flex items-center flex-wrap justify-start w-full">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} openModal={() => openDetails("details", account.id)} />
        ))}
      </div>
    </Accordion>
  );
};

export default AccountsList;
