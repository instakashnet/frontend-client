import React, { useEffect } from "react";
import { _ } from "gridjs-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { ArrowBack, Repeat } from "@material-ui/icons";
import { formatAmount } from "../../../shared/functions";

// REDUX
import { useDispatch } from "react-redux";
import { getOrdersInit } from "../../store/actions";

import { StatusBadge } from "../../../components/UI/status-badge.component";
import { Button } from "../../../components/UI/button.component";
import ActivityTable from "../activity-table.component";

import classes from "../../assets/css/activity-components.module.scss";

const AllActivity = ({ orders, openModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersInit(10000000));
  }, [dispatch]);

  const columns = [
    {
      id: "status",
      name: "Estado",
      width: "120px",
      formatter: (cell) => _(<StatusBadge name={cell.name} color={cell.color} />),
    },
    { id: "pedidoId", name: "Pedido" },
    { id: "date", name: "Fecha" },
    { id: "amount", name: "Solicitado" },
    {
      id: "orderId",
      width: "90px",
      formatter: (cell) => {
        return _(
          <Button className="action-button" onClick={() => openModal(cell, "order")}>
            ver más
          </Button>
        );
      },
    },
  ];

  let data = [];

  if (orders.length) {
    data = orders.map((order) => ({
      status: { color: order.stateColor, name: order.estateName.toLowerCase() },
      pedidoId: order.uuid,
      date: order.completedAt ? moment(order.completedAt).format("DD/MM/YY HH:mm a") : "Incompleta",
      amount: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
      orderId: order.id,
    }));
  }

  return (
    <div className={classes.DashboardCard}>
      <Link to="/dashboard/recent" className="flex items-center mb-6 text-base">
        <ArrowBack fontSize="large" className="mr-2" /> Regresar
      </Link>
      <h2 className="flex items-center mb-3">
        <Repeat className="mr-2" size={20} /> Cambios de divisa realizados
      </h2>
      <ActivityTable data={data} columns={columns} />
    </div>
  );
};

export default AllActivity;
