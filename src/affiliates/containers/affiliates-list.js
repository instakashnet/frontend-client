import React from "react";
import { _ } from "gridjs-react";
import moment from "moment";
import { useDeviceDetect } from "../../shared/hooks/useDeviceDetect";

import { AffiliatesTable } from "../components/affiliates-table.component";
import Card from "../../components/UI/card.component";
import Spinner from "../../components/UI/spinner.component";

import KashIcon from "../../assets/images/kash.svg";

import classes from "../assets/css/affiliates-containers.module.scss";

export const AffiliatesList = ({ affiliates, isLoading, completed, notCompleted, ...rest }) => {
  const { isMobile } = useDeviceDetect(),
    percentage = Math.round((completed / (completed + notCompleted)) * 100),
    rows = affiliates.map((a) => {
      let name = a.firstName.split(" ")[0] + " " + a.lastName.split(" ")[0];

      return {
        user: { name: `${name.length > 12 ? name.substring(0, 12) + "..." : name}`, email: a.email },
        status: a.orderSuccess ? "completado" : "registrado",
        reward: a.orderSuccess,
        date: moment(a.createdAt).format("DD/MM/YYYY hh:mm a"),
      };
    }),
    columns = [
      {
        id: "user",
        name: "Nombre",
        width: "115px",
        formatter: (cell) =>
          _(
            <p>
              {cell.name}
              <br />
              <span className="text-xs">{cell.email}</span>
            </p>
          ),
      },
      {
        id: "status",
        name: "Estado",
        width: "80px",
        formatter: (cell) => _(<p className={cell === "completado" ? classes.Completed : ""}>{cell}</p>),
      },
      {
        id: "reward",
        name: "Recompensa",
        formatter: (cell) => {
          return _(<img src={KashIcon} alt="kash" className={`ml-5 ${!cell ? classes.NoReward : ""}`} />);
        },
      },
    ];

  if (!isMobile)
    columns.push({
      id: "date",
      name: "Fecha de registro",
    });

  return (
    <div {...rest}>
      <article className={classes.AffiliatesSection}>
        <h1>Mis referidos</h1>
        <p className="md:text-center">
          Haz compartido tu código con{" "}
          <b>
            {`${affiliates.length} amigos`} y has ganado {completed} KASH.
          </b>{" "}
          Recuerda que ganas <b>KASH</b> cada vez que tus amigos se registran con tu código y <b>realizan su primer cambio.</b>
        </p>
        <Card className={classes.TableCard}>{isLoading ? <Spinner /> : <AffiliatesTable columns={columns} data={rows} />}</Card>
        <h2 className="my-6 text-center">
          Invita más amigos y gana más <b>KASH</b>
        </h2>
        <div className="flex items-center justify-center flex-wrap">
          <Card className={classes.AffiliatesTotalCard}>
            <h4>{affiliates.length}</h4>
            <p>Invitados</p>
          </Card>
          <Card className={classes.AffiliatesTotalCard}>
            <h4>{notCompleted}</h4>
            <p>Sin completar</p>
          </Card>
          <Card className={classes.AffiliatesTotalCard}>
            <h4>{percentage}%</h4>
            <p>Completados</p>
          </Card>
          <Card className={classes.AffiliatesTotalCard}>
            <h4>{completed}</h4>
            <p>Kash ganados</p>
          </Card>
        </div>
      </article>
    </div>
  );
};
