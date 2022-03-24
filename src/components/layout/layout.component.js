import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "./sidebar.component";
import Header from "./header.component";
import { SliderModal } from "../UI/modals/slider-modal.component";
import { Modal } from "../UI/modals/modal.component";
import { useIntersectionElements } from "../../shared/hooks/useIntersectionElements";

const Layout = ({ className, children }) => {
  const [modalProps, setModalProps] = useState({});
  const [sliderProps, setSliderProps] = useState({});
  const { SliderComponent, Component: ModalComponent } = useSelector((state) => state.Modal);

  useEffect(() => {
    if (ModalComponent) setModalProps(ModalComponent().props);
  }, [ModalComponent]);
  
  useEffect(() => {
    if (SliderComponent) setSliderProps(SliderComponent().props);
  }, [SliderComponent]);

  const { containerRef, isVisible } = useIntersectionElements({
    root: null,
    margin: 0,
    threshold: 0.21,
  });

  return (
    <main className="main-app">
      <Sidebar headerVisible={isVisible} />
      <Header containerRef={containerRef} />
      <section className={`main-section ${className || ""}`}>{children}</section>
      {ModalComponent && (
        <Modal {...modalProps}>
          <ModalComponent />
        </Modal>
      )}

      {SliderComponent && (
        <SliderModal {...sliderProps}>
          <SliderComponent />
        </SliderModal>
      )}
    </main>
  );
};

export default Layout;
