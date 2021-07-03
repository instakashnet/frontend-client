import React from "react";

import Card from "../../core/components/UI/card.component";

import classes from "../assets/css/account-components.module.scss";

const AccountCard = ({ account, openModal }) => {
  const accountNumber = account.account_number || account.cci;

  return (
    <Card className={classes.AccountCard}>
      <div className="flex items-center justify-between">
        <img src={`${process.env.PUBLIC_URL}/images/banks/${account.bank.name.toLowerCase()}-logo.svg`} width={80} alt={account.bank.name} />
        <button onClick={openModal}>ver más</button>
      </div>
      <div className="flex items-center justify-between mt-6">
        <p className="w-1/2">{account.alias}</p>
        <p>
          <span>*******{accountNumber.substring(accountNumber.length - 4, accountNumber.length)}</span>
          <br />
          {account.cci && "Interbancaria"}
        </p>
      </div>
    </Card>
  );
};

export default AccountCard;
