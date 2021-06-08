import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, closeSliderModal } from "../../../store/actions";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Modal from "../UI/modal/Modal";
import SliderModal from "../UI/modal/SliderModal";

const Layout = ({ className, children }) => {
  const dispatch = useDispatch();
  const { Component, SliderComponent } = useSelector((state) => state.Modal);

  const closeModalHandler = () => dispatch(closeModal());
  const closeSliderModalHandler = () => dispatch(closeSliderModal());

  return (
    <main className="main-app">
      <Sidebar />
      <Header />
      <section className={`main-section ${className || ""}`}>{children}</section>
      <Modal closeModal={closeModalHandler}>{Component && <Component />}</Modal>
      <SliderModal closeModal={closeSliderModalHandler}>{SliderComponent && <SliderComponent />}</SliderModal>
    </main>
  );
};

export default Layout;
