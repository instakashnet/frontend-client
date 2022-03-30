import { CreditCard } from "@material-ui/icons";
import _ from "lodash";
import React, { useEffect } from "react";
// REDUX
import { useDispatch,useSelector } from "react-redux";

// COMPONENTS
import Layout from "../../../components/layout/layout.component";
import { Button } from "../../../components/UI/button.component";
import Spinner from "../../../components/UI/spinner.component";
// REDUX ACTIONS
import { getAccountsInit, openModal,setAccountDetailsInit } from "../../../store/actions";
// COMPONENTS
import AccountsList from "../components/accounts-list.component";
import { AddAccount } from "../components/add-account.component";
import WithdrawKash from "../components/forms/withdraw-kash.component";
import { KashAccount } from "../components/kash-account.component";
import NoAccount from "../components/no-accounts.component";
import AccountDetails from "./account-details.screen";
// CLASSES
import classes from "./modules/accounts.screen.module.scss";

const Accounts = () => {
  // HOOKS
  const dispatch = useDispatch(),
    { accounts, kashAccount, isLoading } = useSelector((state) => state.Accounts),
    groupedAccounts = _.map(_.groupBy(accounts, (account) => account.currency.id));

  // EFFECTS
  useEffect(() => {
    dispatch(getAccountsInit("users"));
    dispatch(getAccountsInit("kash"));
  }, [dispatch]);

  // HANDLERS
  const addAccountHandler = () => openModalHandler("add"),
    openModalHandler = (type, accId = null) => {
      let ModalComponent;

      if (type === "add") ModalComponent = () => <AddAccount title="Agregar cuenta" addType="users" />;
      if (type === "details") ModalComponent = () => <AccountDetails title="Datos de la cuenta" />;
      if (type === "withdrawal") ModalComponent = () => <WithdrawKash title="Retirar KASH" accounts={accounts} kashAccount={kashAccount} />;

      if (accId) dispatch(setAccountDetailsInit(accId));

      dispatch(openModal(ModalComponent));
    };

  return (
    <Layout className="content-start">
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
              <div className="grid grid-cols-1 align-center gap-4 mt-8 lg:ml-4">
                {groupedAccounts.map((accounts, i) => (
                  <AccountsList key={i} accounts={accounts} openDetails={openModalHandler} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
      {isLoading && <Spinner loading={isLoading} />}
    </Layout>
  );
};

export default Accounts;
