import React from "react";
// REACT ROUTER
import { Link } from "react-router-dom";
// COMPONENTS
import Layout from "../../../components/layout/layout.component";
import Card from "../../../components/UI/card.component";
// ASSETS & CLASSES
import AffiliateImg from "../images/affiliate.svg";
import ExchangeImg from "../images/exchange.svg";
import classes from "../modules/welcome.module.scss";


const Welcome = () => {
  return (
    <Layout className="content-start mt-8">
      <div className={classes.WelcomeWrapper}>
        <div className={classes.WelcomeCard}>
          <div className="w-9/12 lg:w-2/6">
            <h1>¡Bienvenido a Instakash!</h1>
            <h3>Más fácil y con la mejor tasa del mercado.</h3>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap">
          <Card className={classes.OptionCard}>
            <div className="lg:w-2/3 md:mt-6 md:pl-6">
              <h4>¡Cambia ahora con Instakash!</h4>
              <p>¿Qué esperas para realizar tu cambio de divisas?</p>
              <Link className="action-button" to="/currency-exchange">
                Hacer cambio
              </Link>
            </div>
            <img src={ExchangeImg} alt="exchange" className="self-end" />
          </Card>
          <Card className={classes.OptionCard}>
            <div className="lg:w-2/3 md:mt-6 md:pl-6">
              <h4>¡Gana KASH recomendando!</h4>
              <p>Comparte tu código de afiliado: gana KASH y más beneficios.</p>
              <Link className="action-button" to="/affiliate-program">
                Saber más
              </Link>
            </div>
            <img src={AffiliateImg} alt="affiliate" className="self-end" />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
