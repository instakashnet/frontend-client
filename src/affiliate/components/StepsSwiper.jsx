import React from 'react';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

SwiperCore.use([Navigation]);

const StepsSwiper = () => {
  return <Swiper spaceBetween={50} slidesPerView={3} navigation></Swiper>;
};

export default StepsSwiper;
