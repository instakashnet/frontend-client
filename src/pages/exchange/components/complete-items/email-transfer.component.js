import React from "react";

// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
import Card from "../../../../components/UI/card.component";
import CopyButton from "../../../../components/UI/copy-button.component";
import { MuiAlert } from "../../../../components/UI/mui-alert.component";
// REDUX ACTIONS
import { cancelExchangeInit,processCodeInit } from "../../../../store/actions";
// CLASSES
import classes from "../modules/complete-items/email-transfer.module.scss";

export const EmailTransfer = ({ isProcessing, dispatch, order }) => {
  return (
    <>
      <Card className={`${classes.EmailAddress} flex items-center justify-between`}>
        <p className="font-bold">pagos@instakash.net</p>
        <CopyButton textToCopy="pagos@instakash.net" />
      </Card>
      <MuiAlert type="info" opened>
        <span className="block text-left">
          Recuerda que <b>las transferencias interbancarias pueden demorar hasta 48 horas.</b> Te invitamos a informarte en nuestros{" "}
          <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline">
            términos y condiciones
          </a>
          .
        </span>
      </MuiAlert>
      <div className="flex flex-col justify-center items-center">
        <Button
          type="button"
          className={`action-button mt-6 ld-over ${isProcessing ? "running" : ""}`}
          onClick={() => dispatch(processCodeInit(null, order.id))}
          disabled={isProcessing}
        >
          <span className="ld ld-ring ld-spin" />
          Completar cambio
        </Button>
        <Button type="button" className="secondary-button mt-6" onClick={() => dispatch(cancelExchangeInit(order.id, "complete"))}>
          Cancelar
        </Button>
      </div>
    </>
  );
};
