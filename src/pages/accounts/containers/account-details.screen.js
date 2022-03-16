import React, { useState } from "react";
import { EditOutlined, DeleteOutlineOutlined } from "@material-ui/icons";
import { HashLoader } from "react-spinners";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { deleteAccountInit } from "../../../store/actions";

// COMPONENTS
import EditAccount from "../components/forms/edit-account.component";
import { Button } from "../../../components/UI/button.component";

// CLASSES
import classes from "./modules/account-details.screen.module.scss";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const { accountDetails, isProcessing } = useSelector((state) => state.Accounts);

  return (
    <div className={classes.AccountDetails}>
      {!edit && isProcessing && (
        <div className="flex items-center justify-center p-8">
          <HashLoader size={50} loading={isProcessing} margin={4} color="#0d8284" />
        </div>
      )}
      {!isProcessing && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 mb-6">
            <div>
              <h4>Banco</h4>
              <img src={`${process.env.PUBLIC_URL}/images/banks/${accountDetails.bank.name.toLowerCase()}-logo.svg`} width={80} alt={accountDetails.bank.name} />
            </div>
            <div>
              <h4>Tipo de cuenta</h4>
              <p>{accountDetails.acc_type === "savings" ? "De ahorros" : "corriente"}</p>
            </div>
            <div className="mt-6 md:mt-0 md:text-right">
              <h4>Moneda</h4>
              <p>
                {accountDetails.currency.name} ({accountDetails.currency.Symbol})
              </p>
            </div>
          </div>
          <hr />
          {!edit && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <h4 className="md:mt-4">Número de cuenta</h4>
                  <p>{accountDetails.account_number || accountDetails.cci}</p>
                </div>
                <div className="md:text-right">
                  <h4 className="mt-4">Alias de la cuenta</h4>
                  <p>{accountDetails.alias}</p>
                </div>
              </div>
              {accountDetails.thirdParty && (
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div>
                    <h4 className="md:mt-4">Nombre del titular</h4>
                    <p>{accountDetails.thirdParty.razonSocial || accountDetails.thirdParty.name}</p>
                  </div>
                  <div>
                    <h4 className="md:mt-4">Correo</h4>
                    <p>{accountDetails.thirdParty.email}</p>
                  </div>
                  <div className="md:text-right">
                    <h4 className="mt-4">Documento</h4>
                    <p>
                      {accountDetails.thirdParty.documentType} {accountDetails.thirdParty.documentNumber}
                    </p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mt-6">
                <Button className="action-button mb-4 md:mb-0" type="button" onClick={() => setEdit(true)}>
                  Editar cuenta <EditOutlined className="ml-2" />
                </Button>
                <Button className={classes.DeleteButton} type="button" onClick={() => dispatch(deleteAccountInit(accountDetails))}>
                  Eliminar cuenta <DeleteOutlineOutlined className="ml-2" />
                </Button>
              </div>
            </>
          )}
        </>
      )}
      {edit && <EditAccount account={accountDetails} cancelEdit={() => setEdit(false)} setEdit={setEdit} />}
    </div>
  );
};

export default React.memo(AccountDetails);
