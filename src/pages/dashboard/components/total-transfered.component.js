import { ArrowUpward, Cached } from "@material-ui/icons";
import React from "react";
// COMPONENTS
import Card from "../../../components/UI/card.component";
// HELPERS
import { formatAmount } from "../../../shared/functions";
// CLASSES
import sharedClass from "../assets/css/sharedClasses.module.scss";
import classes from "./modules/total-transfered.module.scss";

const TotalTransfered = ({ totalAmount, className, type }) => {
  let savings = 0;
  if (totalAmount >= 0) savings = totalAmount * 0.03;

  return (
    <div className={`flex flex-wrap md:flex-nowrap ${className || ""}`}>
      <div className={`${sharedClass.DashboardCard} w-full ${type === "account" && "mx-0 md:mx-3"}`}>
        <h2>
          <Cached className="mr-2" /> Soles cambiados
        </h2>
        <p className="mb-3 ml-2">Importe total en Soles</p>
        <Card className="flex items-center h-24 text-center flex-col p-6 justify-center w-full">
          <span className={classes.TotalAmount}>S/. {formatAmount(totalAmount)}</span>
        </Card>
      </div>
      <div className={`${sharedClass.DashboardCard} w-full ${type === "account" && "mx-0 md:mx-3"}`}>
        <h2>
          <ArrowUpward className="mr-2" /> Ahorro aproximado
        </h2>
        <p className="mb-3 ml-2">Importe en relación a otras casas y bancos</p>
        <Card className="flex flex-col h-24 text-center p-6 items-center justify-center">
          <span className={classes.TotalAmount}>S/. {formatAmount(savings)}</span>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(TotalTransfered);
