import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// HOOK
import { useIntersectionElements } from "../../shared/hooks/useIntersectionElements";
// COMPONENTS
import { SliderModal } from "../UI/modals/slider-modal.component";
import Header from "./header.component";
import Sidebar from "./sidebar.component";


const Layout = ({ className, children }) => {
  const [sliderProps, setSliderProps] = useState({});
  const { SliderComponent } = useSelector((state) => state.Modal);

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

      {SliderComponent && (
        <SliderModal {...sliderProps}>
          <SliderComponent />
        </SliderModal>
      )}
    </main>
  );
};

export default Layout;
