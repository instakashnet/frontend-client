import React from "react";

// ASSETS
import KashImg from "../../assets/images/kash.svg";
// COMPONENTS
import UserCode from "../../pages/affiliates/components/user-code.component";
import Card from "../UI/card.component";
// CLASSES
import classes from "./modules/affiliate-card.module.scss";

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
