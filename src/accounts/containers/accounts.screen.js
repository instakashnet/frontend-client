import React, { useEffect } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { CreditCard } from "@material-ui/icons";
import { getAccountsInit, getBanksInit, getCurenciesInit, setAccountDetailsInit, openModal } from "../../store/actions";

import Layout from "../../components/layout/layout.component";
import { Button } from "../../components/UI/button.component";
import AccountsList from "../components/accounts-list.component";
import NoAccount from "../components/no-accounts.component";
import Spinner from "../../components/UI/spinner.component";
import { AddAccount } from "../components/add-account.component";
import AccountDetails from "./account-details.screen";
import KashAccount from "../components/kash-account.component";
import WithdrawKash from "../components/forms/withdraw-kash.component";

import classes from "../assets/css/account-containers.module.scss";

const Accounts = () => {
  const dispatch = useDispatch();
  const { accounts, kashAccount, isLoading } = useSelector((state) => state.Accounts);

  useEffect(() => {
    dispatch(getAccountsInit("users"));
    dispatch(getAccountsInit("kash"));
    dispatch(getBanksInit());
    dispatch(getCurenciesInit());
  }, [dispatch]);

  const addAccountHandler = () => openModalHandler("add");

  const openModalHandler = (type, accId = null) => {
    let ModalComponent;

    if (type === "add") ModalComponent = () => <AddAccount title="Agregar cuenta" addType="users" />;
    if (type === "details") ModalComponent = () => <AccountDetails title="Datos de la cuenta" />;
    if (type === "withdrawal") ModalComponent = () => <WithdrawKash title="Retirar KASH" accounts={accounts} kashAccount={kashAccount} />;

    if (accId) dispatch(setAccountDetailsInit(accId));

    dispatch(openModal(ModalComponent));
  };

  const groupedAccounts = _.map(_.groupBy(accounts, (account) => account.currency.id));

  return (
    <Layout className="content-start">
      {isLoading ? (
        <Spinner screen />
      ) : (
        <div className={classes.Accounts}>
          <KashAccount account={kashAccount} openModal={openModalHandler} />
          {accounts.length <= 0 ? (
            <NoAccount onAddAccount={addAccountHandler} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4">
              <section className="mt-3 md:mt-6">
                <h1 className="flex items-center justify-start ml-2 mt-5">
                  <CreditCard className="mr-3" />
                  <span>Mis cuentas</span>
                </h1>
                <div className="flex items-center flex-wrap lg:flex-nowrap justify-center md:justify-between my-5">
                  <Button type="button" onClick={addAccountHandler} className="action-button md:max-w-sm lg:max-w-xs lg:my-0">
                    Agregar cuenta
                  </Button>
                </div>
                <p className="mt-3 text-sm">
                  Las cuentas que agregues deberán ser <b>tuyas o de tu empresa</b>. Puedes tener hasta <b>20 cuentas agregadas</b>, 10 cuentas en soles y 10 en dólares.
                </p>
              </section>
              <section className="lg:col-span-3 md:ml-3">
                <div className="grid grid-cols-1 align-center gap-4 mt-8">
                  {groupedAccounts.map((accounts, i) => (
                    <AccountsList key={i} accounts={accounts} openDetails={openModalHandler} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Accounts;
