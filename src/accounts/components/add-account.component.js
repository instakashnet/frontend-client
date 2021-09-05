import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "@material-ui/core";

import { PersonalAccount } from "./forms/personal-account.component";
import { ThirdPartyAccount } from "./forms/third-account.component";

import classes from "../assets/css/account-components.module.scss";

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

export const AddAccount = ({ order, addType }) => {
  const [value, setValue] = useState(0);
  const { banks, currencies } = useSelector((state) => state.Data);

  const bankOptions = banks.map((bank) => ({
    value: bank.id,
    label: bank.name.toUpperCase(),
    isDirect: !!bank.active,
    icon: `${process.env.PUBLIC_URL}/images/banks/${bank.name.toLowerCase()}-logo.svg`,
  }));
  const accountTypeOptions = [
    { value: "checking", label: "Corriente" },
    { value: "savings", label: "De ahorros" },
  ];
  const currencyOptions = order
    ? currencies.filter((currency) => currency.id === order.currencyReceivedId).map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }))
    : currencies.map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }));

  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <>
      <Tabs value={value} onChange={handleChange} classes={{ root: classes.AddAccountsTabs }} variant="fullWidth" aria-label="Tabs de afiliados">
        <Tab label="Cuenta personal" {...a11yProps(0)} classes={{ root: classes.AddAccountTab }} />
        <Tab label="Cuenta terceros" {...a11yProps(1)} classes={{ root: classes.AddAccountTab }} />
      </Tabs>
      <PersonalAccount addType={addType} banks={bankOptions} accountTypes={accountTypeOptions} currencies={currencyOptions} value={value} index={0} />
      <ThirdPartyAccount addType={addType} banks={bankOptions} accountTypes={accountTypeOptions} currencies={currencyOptions} value={value} index={1} />
    </>
  );
};
