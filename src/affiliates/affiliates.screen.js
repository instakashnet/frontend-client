import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab } from "@material-ui/core";
import { getAffiliatesInit } from "../store/actions";

import Layout from "../components/layout/layout.component";
import { Instructions } from "./containers/instructions";
import { AffiliatesList } from "./containers/affiliates-list";

import classes from "./assets/css/affiliates-containers.module.scss";

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const AffiliatesScreen = () => {
  const dispatch = useDispatch(),
    [value, setValue] = useState(0),
    { affiliates, isLoading } = useSelector((state) => state.Affiliates),
    completed = affiliates.filter((a) => a.orderSuccess).length,
    notCompleted = affiliates.filter((a) => !a.orderSuccess).length;

  // EFFECTS
  useEffect(() => {
    dispatch(getAffiliatesInit());
  }, [dispatch]);

  // HANDLERS
  const handleChange = (_, newValue) => setValue(newValue),
    handleChangeIndex = (index) => setValue(index);

  return (
    <Layout className="max-screen content-start">
      <Tabs value={value} onChange={handleChange} className={classes.AffiliatesTabs} variant="fullWidth" aria-label="Tabs de afiliados">
        <Tab className={classes.AffiliatesTab} label="Compartir" {...a11yProps(0)} />
        <Tab className={classes.AffiliatesTab} label="Mis referidos" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <Instructions value={value} role="tabpanel" index={0} />
        <AffiliatesList value={value} role="tabpanel" index={1} affiliates={affiliates} completed={completed} notCompleted={notCompleted} isLoading={isLoading} />
      </SwipeableViews>
    </Layout>
  );
};

export default AffiliatesScreen;
