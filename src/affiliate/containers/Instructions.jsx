import React from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

import Layout from '../../core/components/layout/Layout';
import StepsSwiper from '../components/StepsSwiper';
import Step from '../components/Step';
import Card from '../../core/components/UI/Card';
import UserCode from '../components/UserCode';

import Step1Img from '../assets/images/step1.svg';
import Step2Img from '../assets/images/step2.svg';
import Step3Img from '../assets/images/step3.svg';
import Arrow1 from '../assets/images/arrow1.svg';
import Arrow2 from '../assets/images/arrow2.svg';

import classes from '../assets/css/Instructions.module.scss';

const Instructions = () => {
  return (
    <Layout className='content-start mt-12'>
      <article className={classes.Instructions}>
        <h1>¡Recomienda y gana!</h1>
        <h3>Comparte el código con tus amigos</h3>
        {isMobile && <StepsSwiper />}
        {!isMobile && (
          <div className='flex flex-col md:flex-row items-center justify-around mt-4'>
            <Step img={Step1Img} title='1. Comparte tu código con amigos'>
              <p>Cada amigo registrado con tu código obtendrá una tasa preferencial en su primer cambio.</p>
            </Step>
            <img src={Arrow1} className='hidden lg:block' alt='siguiente' />
            <Step img={Step2Img} className='self-end' title='2. Disfruta tus recompensas'>
              <p>
                Una vez tu amigo complete su primer cambio tu ganarás <b>1 KASH</b> reflejado en tu cuenta que puedes <Link to='/my-accounts'>ver aquí</Link>
              </p>
            </Step>
            <img src={Arrow2} className='hidden lg:block' alt='siguiente' />
            <Step img={Step3Img} title='3. Acumula sin límites'>
              <p>No hay límites, mientras más compartas tu código podrás acumular más Kash.</p>
            </Step>
          </div>
        )}
        <Card className={classes.CodeCard}>
          <UserCode userCode='ROGER123' />
          <p className='hidden md:block font-bold text-left'>
            Puedes retirar tus KASH en tus cambios de divisas adicionándolos a tu monto a recibir, o retirarlos directamente a una de tus cuentas en dólares.
          </p>
        </Card>
        <p className='hidden md:block text-center mt-4'>
          Para mayor información te invitamos a leer nuestros <a href='https://instakash.net/terminos-y-condiciones'>términos y condiciones</a> en la sección KASH.
        </p>
      </article>
    </Layout>
  );
};

export default Instructions;
