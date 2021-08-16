import React from "react";

import LogoImg from "../../assets/images/logo.svg";

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <img src={LogoImg} alt="instakash" className="w-full" />
    </div>
  );
};

export default Logo;
