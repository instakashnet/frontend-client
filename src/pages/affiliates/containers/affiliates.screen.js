import { Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import Layout from "../../../components/layout/layout.component";
import Spinner from "../../../components/UI/spinner.component";
import { getAccountsInit, getAffiliatesInit } from "../../../store/actions";
import { AffiliatesList } from "./affiliates-list";
import { Instructions } from "./instructions";
import classes from "./modules/affiliates.screen.module.scss";

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const AffiliatesScreen = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { affiliates, isLoading } = useSelector((state) => state.Affiliates),
    { kashAccount } = useSelector((state) => state.Accounts);

  useEffect(() => {
    dispatch(getAffiliatesInit());
    dispatch(getAccountsInit("kash"));
  }, [dispatch]);

  const handleChange = (_, newValue) => setValue(newValue);
  const handleChangeIndex = (index) => setValue(index);

  return (
    <Layout className="max-screen content-start">
      <Tabs value={value} onChange={handleChange} className={classes.AffiliatesTabs} variant="fullWidth" aria-label="Tabs de afiliados">
        <Tab className={classes.AffiliatesTab} label="Compartir" {...a11yProps(0)} />
        <Tab className={classes.AffiliatesTab} label="Mis referidos" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <Instructions value={value} role="tabpanel" index={0} />
        <AffiliatesList value={value} role="tabpanel" index={1} affiliates={affiliates} isLoading={isLoading} kashBalance={kashAccount.balance} />
      </SwipeableViews>
      {isLoading && <Spinner loading={isLoading} />}
    </Layout>
  );
};

export default AffiliatesScreen;
