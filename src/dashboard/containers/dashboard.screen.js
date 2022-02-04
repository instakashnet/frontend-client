import React from "react";
import { Route } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { openSliderModal, getOrderDetailsInit } from "../../store/actions";

// COMPONENTS
import Layout from "../../components/layout/layout.component";
import { AllActivityScreen } from "./all-activity.screen";
import OrderDetails from "../components/details/order-details.component";
import WithdrawDetails from "../components/details/withdraw-details.component";
import Spinner from "../../components/UI/spinner.component";
import { RecentActivityScreen } from "./recent-activity.screen";

const Dashboard = ({ match }) => {
  const dispatch = useDispatch(),
    { orders, withdrawals, isLoading } = useSelector((state) => state.Dashboard);

  // HANDLERS
  const openDetails = (id, type = null) => {
    let SliderComponent;

    if (type === "order") SliderComponent = () => <OrderDetails title="Datos del pedido" />;
    if (type === "withdrawal") SliderComponent = () => <WithdrawDetails title="Datos del pedido" />;

    dispatch(getOrderDetailsInit(id, type));
    dispatch(openSliderModal(SliderComponent));
  };

  return (
    <>
      <Layout className={`${orders.length <= 0 && withdrawals.length <= 0 ? "content-center" : "content-start"} max-screen`}>
        <Route exact path={match.url + "/recent"}>
          <RecentActivityScreen orders={orders} withdrawals={withdrawals} openDetails={openDetails} />
        </Route>
        <Route path={match.url + "/all"}>
          <AllActivityScreen orders={orders} isLoading={isLoading} openModal={openDetails} />
        </Route>
        {isLoading && <Spinner isLoading={isLoading} />}
      </Layout>
    </>
  );
};

export default Dashboard;
