import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Repeat } from "@material-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import Skeleton from "react-loading-skeleton";
import { getOrdersInit, getWithdrawalsInit } from "../../../store/actions";

import Card from "../../../components/UI/card.component";

import { OrderItem } from "../orders/order-item.component";

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

  const groupedOrders = _.chunk(orders, 4);
  const groupedWithdrawals = _.chunk(withdrawals, 4);

  return (
    <div>
      <div className={classes.DashboardCard}>
        <h2 className="flex font-bold items-center mb-2">
          <Repeat className="mr-2" /> Últimos cambios de divisa
        </h2>
        {isLoading && <Skeleton count={5} height={20} />}
        {!isLoading &&
          (orders.length > 0 ? (
            <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true, el: ".swiper-pagination" }} className={classes.SwiperContainer}>
              {groupedOrders.map((orders, i) => (
                <SwiperSlide key={i} className="mr-3">
                  {orders.map((order) => (
                    <Card key={order.id} className="mb-5">
                      <OrderItem order={order} type="order" openModal={openModal} isMobile />
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
          <Repeat className="mr-2" /> Últimos retiros KASH
        </h2>
        {isLoading && <Skeleton count={5} height={20} />}
        {!isLoading &&
          (withdrawals.length > 0 ? (
            <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true, el: ".swiper-pagination" }} className={classes.SwiperContainer}>
              {groupedWithdrawals.map((withdrawals, i) => (
                <SwiperSlide key={i} className="mr-3">
                  {withdrawals.map((withdrawal) => (
                    <Card key={withdrawal.id} className="mb-5">
                      <OrderItem order={withdrawal} type="withdrawal" openModal={openModal} isMobile />
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
