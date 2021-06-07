import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getScheduleInit } from "../../store/actions";

import Card from "../../core/components/UI/Card";
import Layout from "../../core/components/layout/Layout";
import OutOfTime from "../../core/containers/OutOfTime";

import ExchangeImg from "../images/exchange.svg";
import AffiliateImg from "../images/affiliate.svg";

import classes from "./Welcome.module.scss";

const Welcome = () => {
  const dispatch = useDispatch();
  const [outOfTime, setOutOfTime] = useState(false);
  const schedule = useSelector((state) => state.Data.schedule);

  useEffect(() => {
    dispatch(getScheduleInit());
  }, [dispatch]);

  useEffect(() => {
    if (schedule && schedule.length > 0) {
      schedule.forEach((day) => {
        const actualDay = new Date().getDay();
        if (day.idDayOfWeek === actualDay) {
          if (!day.isWorkingDay) return setTimeout(() => setOutOfTime(true), 500);

          const actualTime = moment(new Date(), "HH:mm");
          const startTime = moment(day.startTime, "HH:mm");
          const endTime = moment(day.endTime, "HH:mm");

          if (!actualTime.isAfter(startTime) || !actualTime.isBefore(endTime)) return setTimeout(() => setOutOfTime(true), 500);
        }
      });
    }
  }, [schedule]);

  const closeOutOfTime = () => setOutOfTime(false);

  return outOfTime ? (
    <OutOfTime onClose={closeOutOfTime} />
  ) : (
    <Layout className="content-start mt-8">
      <div className={classes.Welcome}>
        <div className="w-9/12 lg:w-2/6">
          <h1>¡Bienvenido a Instakash!</h1>
          <p>Con nosotros todo es más fácil, ahora puedes cambiar dólares desde cualquier lugar.</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-3">
        <Card className={classes.OptionCard}>
          <div className="lg:w-2/3 md:mt-6 md:pl-6">
            <h4>¡Cambia ahora con Instakash!</h4>
            <p>¿Que esperas para realizar tu cambio de divisas?</p>
            <Link className="action-button" to="/currency-exchange">
              Hacer cambio
            </Link>
          </div>
          <img src={ExchangeImg} alt="exchange" className="self-end" />
        </Card>
        <Card className={classes.OptionCard}>
          <div className="lg:w-2/3 md:mt-6 md:pl-6">
            <h4>¡Gana KASH recomendando!</h4>
            <p>Comparte tu código de afiliado y gana KASH y más beneficios.</p>
            <Link className="action-button" to="/affiliate-program">
              Saber más
            </Link>
          </div>
          <img src={AffiliateImg} alt="affiliate" className="self-end" />
        </Card>
      </div>
    </Layout>
  );
};

export default Welcome;
