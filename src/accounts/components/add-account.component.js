import React, { useState } from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab } from "@material-ui/core";

import { PersonalAccount } from "./forms/personal-account.component";
import { ThirdPartyAccount } from "./forms/third-account.component";

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

export const AddAccount = ({ order, addType }) => {
  const [value, setValue] = useState(0);
  const { banks, currencies } = useSelector((state) => state.Data);

  const bankOptions = banks.map((bank) => ({ value: bank.id, label: bank.name, icon: `${process.env.PUBLIC_URL}/images/banks/${bank.name.toLowerCase()}-logo.svg` }));
  const accountTypeOptions = [
    { value: "checking", label: "Corriente" },
    { value: "savings", label: "De ahorros" },
  ];
  const currencyOptions = order
    ? currencies.filter((currency) => currency.id === order.currencyReceivedId).map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }))
    : currencies.map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }));

  const handleChange = (_, newValue) => setValue(newValue);
  const handleChangeIndex = (index) => setValue(index);

  return (
    <>
      <h2>Agregar cuenta</h2>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="Tabs de afiliados">
        <Tab label="Cuenta personal" {...a11yProps(0)} />
        <Tab label="Cuenta de terceros" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <PersonalAccount addType={addType} banks={bankOptions} accountTypes={accountTypeOptions} currencies={currencyOptions} value={value} role="tabpanel" index={0} />
        <ThirdPartyAccount addType={addType} banks={bankOptions} accountTypes={accountTypeOptions} currencies={currencyOptions} value={value} role="tabpanel" index={1} />
      </SwipeableViews>
    </>
  );
};
