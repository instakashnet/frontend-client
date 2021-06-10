import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSliderModal } from "../../../store/actions";

import Sidebar from "./Sidebar";
import Header from "./Header";
import SliderModal from "../UI/modal/SliderModal";

const Layout = ({ className, children }) => {
  const dispatch = useDispatch();
  const SliderComponent = useSelector((state) => state.Modal.SliderComponent);

  const closeSliderModalHandler = () => dispatch(closeSliderModal());

  return (
    <main className="main-app">
      <Sidebar />
      <Header />
      <section className={`main-section ${className || ""}`}>{children}</section>
      <SliderModal closeModal={closeSliderModalHandler}>{SliderComponent && <SliderComponent />}</SliderModal>
    </main>
  );
};

export default Layout;
