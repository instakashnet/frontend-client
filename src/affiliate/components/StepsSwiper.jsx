import React, { useRef } from 'react';
import SwiperCore, { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';

import Step from './Step';

import Step1Img from '../assets/images/step1.svg';
import Step2Img from '../assets/images/step2.svg';
import Step3Img from '../assets/images/step3.svg';
import Step4Img from '../assets/images/step4.svg';
import classes from '../assets/css/StepsSwiper.module.scss';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Navigation]);

const StepsSwiper = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Swiper
      cssMode
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
        <Step img={Step1Img} title='1. Comparte tu código con amigos'>
          <p>Cada amigo registrado con tu código obtendrá una tasa preferencial en su primer cambio.</p>
        </Step>
      </SwiperSlide>
      <SwiperSlide>
        <Step img={Step2Img} title='2. Disfruta tus recompensas'>
          <p>
            Una vez tu amigo complete su primer cambio tu ganarás <b>1 KASH</b> reflejado en tu cuenta que puedes <Link to='/my-accounts'>ver aquí</Link>
          </p>
        </Step>
      </SwiperSlide>
      <SwiperSlide>
        <Step img={Step3Img} title='3. Acumula sin límites'>
          <p>No hay límites, mientras más compartas tu código podrás acumular más Kash.</p>
        </Step>
      </SwiperSlide>
      <SwiperSlide>
        <Step img={Step4Img}>
          <p className='text-center'>
            Puedes retirar tus KASH en tus cambios de divisas adicionándolos a tu monto a recibir, o retirarlos directamente a una de tus cuentas en dólares. <br /> Para mayor
            información te invitamos a leer nuestros <a href='https://instakash.net/terminos-y-condiciones'>términos y condiciones</a> en la sección KASH.
          </p>
        </Step>
      </SwiperSlide>
      <div ref={navigationPrevRef} className={classes.SwiperPrev}>
        <ArrowLeftCircle size={30} />
      </div>
      <div ref={navigationNextRef} className={classes.SwiperNext}>
        <ArrowRightCircle size={30} />
      </div>
    </Swiper>
  );
};

export default StepsSwiper;
