import React, { useRef } from "react";
import SwiperCore, { Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

import Step from "./step.component";

import Step1Img from "../assets/images/step1.svg";
import Step2Img from "../assets/images/step2.svg";
import Step3Img from "../assets/images/step3.svg";
import Step4Img from "../assets/images/step4.svg";
import classes from "./modules/steps-swiper.module.scss";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

SwiperCore.use([Navigation]);

const StepsSwiper = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Swiper
      cssMode
      loop
      className={classes.SwiperContainer}
      nnavigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        swiper.params.navigation.nextEl = navigationNextRef.current;
      }}>
      <SwiperSlide>
        <Step img={Step1Img} title="1. Comparte tu código con amigos">
          <p>
            <b>Copia</b> tu código de afiliado mostrado en pantalla y compártelo con tus amigos. Anímalos a que realicen su primer cambio.
          </p>
        </Step>
      </SwiperSlide>
      <SwiperSlide>
        <Step img={Step2Img} title="2. Disfruta tus recompensas">
          <p>
            Cada amigo registrado con tu codigo recibirá una tasa preferencial en su primer cambio y tú ganarás <b>1 KASH = 1 $</b>.
          </p>
        </Step>
      </SwiperSlide>
      <SwiperSlide>
        <Step img={Step3Img} title="3. Acumula sin límites">
          <p>
            Acumula <b>KASH</b> y úsalos en tus cambios tanto en soles como en dólares. También podrás retirarlos a tu cuenta bancaria cuando quieras.
          </p>
        </Step>
      </SwiperSlide>
      <SwiperSlide>
        <Step img={Step4Img}>
          <p className="text-center">
            Con Instakash ganas tú y los tuyos. No hay límites, mientras más compartas tu código más oportunidades tienes de ganar KASH. <br />
            Para mayor información te invitamos a leer nuestros <a href="https://instakash.net/terminos-y-condiciones">términos y condiciones</a> en la sección KASH.
          </p>
        </Step>
      </SwiperSlide>
      <div ref={navigationPrevRef} className={classes.SwiperPrev}>
        <ArrowLeft size={23} />
      </div>
      <div ref={navigationNextRef} className={classes.SwiperNext}>
        <ArrowRight size={23} />
      </div>
    </Swiper>
  );
};

export default StepsSwiper;
