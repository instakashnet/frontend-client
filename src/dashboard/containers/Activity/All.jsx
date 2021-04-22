import React from 'react';
import { _ } from 'gridjs-react';
import moment from 'moment';
import { Repeat } from 'react-feather';
import { formatAmount } from '../../../shared/functions';

import Button from '../../../core/components/UI/Button';
import Table from '../../components/Table';

import classes from '../Dashboard.module.scss';

const AllActivity = ({ orders, openModal }) => {
  const columns = [
    {
      id: 'status',
      name: 'Estado',
      width: '120px',
      formatter: (cell) =>
        _(
          <div className='flex items-center'>
            <span style={{ width: 10, height: 10, backgroundColor: cell.color, borderRadius: '50%', margin: '3px 10px 0 0' }} />
            <p>{cell.name}</p>
          </div>
        ),
    },
    { id: 'pedidoId', name: 'Pedido' },
    { id: 'date', name: 'Fecha' },
    { id: 'amount', name: 'Solicitado' },
    {
      id: 'orderId',
      width: '90px',
      formatter: (cell) => {
        return _(
          <Button className={classes.ActionButton} onClick={() => openModal(cell, 'order')}>
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
      date: moment(order.created).format('DD/MM/YY HH:mm a'),
      amount: `${order.currencyReceived === 'USD' ? '$' : 'S/.'} ${formatAmount(order.amountReceived)}`,
      orderId: order.id,
    }));
  }

  return (
    <div className={classes.DashboardCard}>
      <h2 className='flex items-center mb-3'>
        <Repeat className='mr-2' size={20} /> Cambios de divisa realizados
      </h2>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default AllActivity;
