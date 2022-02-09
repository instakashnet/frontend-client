import React from "react";

// COMPONENTS
import Card from "../UI/card.component";
import UserCode from "../../pages/affiliates/components/user-code.component";

// ASSETS & CLASSES
import KashImg from "../../assets/images/kash.svg";
import classes from "./layout-components.module.scss";

const Affiliate = ({ usercode }) => {
  return (
    <Card className={classes.AffiliateCard}>
      <img src={KashImg} alt="affiliate" />
      <h3>¡Comparte y gana!</h3>
      <UserCode userCode={usercode} />
      <p>
        <b>¡Comparte el código con tus amigos!</b>
      </p>
    </Card>
  );
};

export default React.memo(Affiliate);
