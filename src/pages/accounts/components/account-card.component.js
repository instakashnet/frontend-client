import React from "react";

// COMPONENTS
import Card from "../../../components/UI/card.component";
// CLASSES
import classes from "./modules/account-card.module.scss";

const AccountCard = ({ account, openModal }) => {
  const accountNumber = account.account_number || account.cci;

  return (
    <Card className={classes.AccountCard}>
      <div className="flex items-center justify-between">
        <img src={`${process.env.PUBLIC_URL}/images/banks/${account.bank.name.toLowerCase()}-logo.svg`} width={80} alt={account.bank.name} />
        <button onClick={openModal}>ver más</button>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="w-3/5">
          <p>{account.alias}</p>
          {account.thirdParty && <span className="text-sm text-green relative -top-0.5">cuenta tercero</span>}
        </div>
        <p>****{accountNumber.substring(accountNumber.length - 4, accountNumber.length)}</p>
      </div>
    </Card>
  );
};

export default AccountCard;
