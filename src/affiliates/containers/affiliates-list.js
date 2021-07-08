import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _ } from "gridjs-react";

import { getAffiliatesInit } from "../../store/actions";

import { AffiliatesTable } from "../components/affiliates-table.component";
import Card from "../../core/components/UI/card.component";

import KashIcon from "../../core/assets/images/kash.svg";

import classes from "../assets/css/affiliates-containers.module.scss";

export const AffiliatesList = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { affiliates, isLoading } = useSelector((state) => state.Affiliates);

  console.log(affiliates, isLoading);

  useEffect(() => {
    dispatch(getAffiliatesInit());
  }, [dispatch]);

  const columns = [
    {
      id: "user",
      name: "Nombre",
      formatter: (cell) =>
        _(
          <p>
            {cell.name}
            <br />
            {cell.email}
          </p>
        ),
    },
    { id: "status", name: "Estado", formatter: (cell) => _(<p>{cell.name}</p>) },
    { id: "reward", name: "Recompensa", formatter: (cell) => _(<img src={KashIcon} />) },
  ];

  return (
    <div {...rest}>
      <article className={classes.AffiliatesSection}>
        <h1>Mis referidos</h1>
        <p>Haz compartido tu código con 5 amigos y has ganado 1 KASH. Recuerda que ganas KASH cada vez que tus amigos se registran con tu código y realizan su primer cambio.</p>
        <Card className="mt-6 px-2">
          <AffiliatesTable columns={columns} />
        </Card>
      </article>
    </div>
  );
};
