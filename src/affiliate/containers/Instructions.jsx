import React from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions";

import Layout from "../../core/components/layout/Layout";
import StepsSwiper from "../components/StepsSwiper";
import Step from "../components/Step";
import UserCode from "../components/UserCode";
import EditCode from "./EditCode";
import ShareIcons from "../components/ShareIcons";
import Card from "../../core/components/UI/Card";

import Step1Img from "../assets/images/step1.svg";
import Step2Img from "../assets/images/step2.svg";
import Step3Img from "../assets/images/step3.svg";
import Arrow1 from "../assets/images/arrow1.svg";
import Arrow2 from "../assets/images/arrow2.svg";

import classes from "../assets/css/Instructions.module.scss";

const Instructions = () => {
  const dispatch = useDispatch();
  const usercode = useSelector((state) => state.Auth.userCode);

  const editCodeHandler = () => dispatch(openModal(EditCode));

  return (
    <Layout className="content-start">
      <article className={classes.Instructions}>
        <h1>¡Recomienda y gana!</h1>
        <h3>Comparte el código con tus amigos</h3>
        {isMobile && <StepsSwiper />}
        {!isMobile && (
          <div className="flex flex-col md:flex-row items-center justify-around mt-4">
            <Step img={Step1Img} title="1. Comparte tu código con amigos">
              <p>
                <b>Copia</b> tu código de afiliado mostrado en pantalla y compártelo con tus amigos. Anímalos a que realicen su primer cambio.
              </p>
            </Step>
            <img src={Arrow1} className="hidden lg:block" alt="siguiente" />
            <Step img={Step2Img} className={`self-end ${classes.Step2}`} title="2. Recibe ">
              <p>
                Cada amigo registrado con tu codigo recibirá una tasa preferencial en su primer cambio y tu ganarás <b>1 KASH = 1 $</b>.
              </p>
            </Step>
            <img src={Arrow2} className="hidden lg:block" alt="siguiente" />
            <Step img={Step3Img} title="3. Acumula sin límites">
              <p>
                Acumula <b>KASH</b> y úsalos en tus cambios tanto en soles como en dólares. También podrás retirarlos a tu cuenta bancaria cuando quieras.
              </p>
            </Step>
          </div>
        )}
        <Card className={classes.CodeInfoCard}>
          <div className={classes.CodeWrapper}>
            <UserCode userCode={usercode} />
            <button onClick={editCodeHandler}>Editar mi código</button>
          </div>
          <p className="hidden md:block text-left">
            Con Instakash ganas tú y los tuyos. No hay límites, mientras más <b>compartas tu código</b> más oportunidades tienes de ganar <b>KASH</b>.
          </p>
        </Card>
        <p className="hidden md:block text-center mt-8">
          Para mayor información te invitamos a leer nuestros <a href="https://instakash.net/terminos-y-condiciones">términos y condiciones</a> en la sección KASH.
        </p>
        <div className="flex items-center justify-center flex-col mt-4 lg:flex-row text-center">
          <p className="md:mr-4 lg:mr-8">
            ¡Invita a tus amigos y gana <b>KASH</b> ahora!
          </p>
          <ShareIcons userCode={usercode} className="mt-3 md:mt-0" />
        </div>
      </article>
    </Layout>
  );
};

export default Instructions;
