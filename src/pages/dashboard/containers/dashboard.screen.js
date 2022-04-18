import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// REACT ROUTER
import { Route } from "react-router-dom";
// COMPONENTS
import Layout from "../../../components/layout/layout.component";
import Spinner from "../../../components/UI/spinner.component";
// REDUX ACTIONS
import { getOrderDetailsInit, openSliderModal } from "../../../store/actions";
// COMPONENTS
import OrderDetails from "../components/details/order-details.component";
import WithdrawDetails from "../components/details/withdraw-details.component";
// SCREENS
import { AllActivityScreen } from "./all-activity.screen";
import { RecentActivityScreen } from "./recent-activity.screen";


const Dashboard = ({ match }) => {
  const dispatch = useDispatch(),
    { orders, withdrawals, isLoading } = useSelector((state) => state.Activity);

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
