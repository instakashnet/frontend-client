import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSliderModal } from "../../store/actions";

import Sidebar from "./sidebar.component";
import Header from "./header.component";
import SliderModal from "../UI/modals/slider-modal.component";
import Modal from "../UI/modals/modal.component";

const Layout = ({ className, children }) => {
  const dispatch = useDispatch();
  const { SliderComponent, Component: ModalComponent } = useSelector((state) => state.Modal);

  const closeSliderModalHandler = () => dispatch(closeSliderModal());

  return (
    <main className="main-app">
      <Sidebar />
      <Header />
      <section className={`main-section ${className || ""}`}>{children}</section>
      {ModalComponent && (
        <Modal>
          <ModalComponent />
        </Modal>
      )}

      {SliderComponent && (
        <SliderModal closeModal={closeSliderModalHandler}>
          <SliderComponent />
        </SliderModal>
      )}
    </main>
  );
};

export default Layout;
