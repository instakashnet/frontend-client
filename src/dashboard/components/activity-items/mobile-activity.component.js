import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Repeat } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { formatAmount } from "../../../shared/functions";
import { getOrdersInit, getWithdrawalsInit } from "../../../store/actions";

import Card from "../../../core/components/UI/card.component";
import Button from "../../../core/components/UI/button.component";

import classes from "../../assets/css/activity-components.module.scss";

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Pagination]);

const ActivityMobile = ({ orders, withdrawals, openModal, isLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersInit());
    dispatch(getWithdrawalsInit());
  }, [dispatch]);

  const groupedOrders = _.chunk(orders, 3);
  const groupedWithdrawals = _.chunk(withdrawals, 3);

  return (
    <div>
      <div className={classes.DashboardCard}>
        <h2 className="flex items-center mb-2">
          <Repeat className="mr-2" /> Cambios de divisa
        </h2>
        {isLoading && <Skeleton count={5} height={20} />}
        {!isLoading &&
          (orders.length > 0 ? (
            <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true, el: ".swiper-pagination" }} className={classes.SwiperContainer}>
              {groupedOrders.map((orders, i) => (
                <SwiperSlide key={i} className="mr-3">
                  {orders.map((order) => (
                    <Card className="p-4 my-3" key={order.id}>
                      <article className={classes.ActivityMobile}>
                        <section>
                          <h4>Estado</h4>
                          <div className="flex items-center">
                            <span style={{ width: 10, height: 10, backgroundColor: order.stateColor, borderRadius: "50%", margin: "0 5px 0 0" }} />
                            <p style={{ fontWeight: 600, color: order.stateColor }}>{order.estateName.toLowerCase()}</p>
                          </div>
                        </section>
                        <section>
                          <h4>Pedido</h4>
                          <p>{order.uuid}</p>
                        </section>
                      </article>
                      <article className={classes.ActivityMobile}>
                        {order.completedAt && (
                          <section>
                            <h4>Fecha</h4>
                            <p>{moment(order.completedAt).format("DD/MM HH:mm")}</p>
                          </section>
                        )}
                        <section className="mr-4">
                          <h4>Solicitado</h4>
                          <p className={classes.Price}>{`${order.currencyReceived === "USD" ? "$" : "S/."} ${formatAmount(order.amountReceived)}`}</p>
                        </section>
                        <section className="mt-4">
                          <Button onClick={() => openModal(order.id, "order")} className={classes.ActionButton}>
                            ver más
                          </Button>
                        </section>
                      </article>
                    </Card>
                  ))}
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
            </Swiper>
          ) : null)}
      </div>
      <div className={classes.DashboardCard}>
        <h2 className="flex items-center mb-2 mt-6">
          <Repeat className="mr-2" /> Retiros KASH
        </h2>
        {isLoading && <Skeleton count={5} height={20} />}
        {!isLoading &&
          (withdrawals.length > 0 ? (
            <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true, el: ".swiper-pagination" }} className={classes.SwiperContainer}>
              {groupedWithdrawals.map((withdrawals, i) => (
                <SwiperSlide key={i} className="mr-3">
                  {withdrawals.map((withdrawal) => (
                    <Card className="p-4 my-3" key={withdrawal.id}>
                      <article className={classes.ActivityMobile}>
                        <section>
                          <h4>Estado</h4>
                          <div className="flex items-center">
                            <span style={{ width: 10, height: 10, backgroundColor: withdrawal.statusColor, borderRadius: "50%", margin: "0 5px 0 0" }} />
                            <p style={{ fontWeight: 600, color: withdrawal.statusColor }}>{withdrawal.statusName.toLowerCase()}</p>
                          </div>
                        </section>
                        <section>
                          <h4>Pedido</h4>
                          <p>{withdrawal.uuid}</p>
                        </section>
                      </article>
                      <article className={classes.ActivityMobile}>
                        <section>
                          <h4>Fecha</h4>
                          <p>{moment(withdrawal.createdAt).format("DD/MM HH:mm")}</p>
                        </section>
                        <section className="mr-4">
                          <h4>Solicitado</h4>
                          <p className={classes.Price}>{withdrawal.kashQty} KASH</p>
                        </section>
                        <section className="mt-4">
                          <Button onClick={() => openModal(withdrawal.id, "withdrawal")} className={classes.ActionButton}>
                            ver más
                          </Button>
                        </section>
                      </article>
                    </Card>
                  ))}
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
            </Swiper>
          ) : null)}
      </div>
    </div>
  );
};

export default React.memo(ActivityMobile);
