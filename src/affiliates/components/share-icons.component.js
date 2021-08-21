import React from "react";
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton } from "react-share";

import FacebookIcon from "../../assets/images/social/facebook.svg";
import WhatsappIcon from "../../assets/images/social/whatsapp.svg";
import LinkedinIcon from "../../assets/images/social/linkedin.svg";

const ShareIcons = ({ className, userCode }) => {
  const message = `¡Registrate con mi código ${userCode} para que obtengas una tasa preferencial!`;

  return (
    <div className={`flex items-center justify-center ${className || ""}`}>
      <FacebookShareButton quote={message} url="https://instakash.net">
        <img src={FacebookIcon} width={30} height={30} alt="facebook" className="mx-2" />
      </FacebookShareButton>
      <WhatsappShareButton title={message} url="https://instakash.net">
        <img src={WhatsappIcon} width={35} height={35} alt="whatsapp" className="mx-2" />
      </WhatsappShareButton>
      <LinkedinShareButton summary={message} url="https://instakash.net">
        <img src={LinkedinIcon} width={30} height={30} alt="linkedin" className="mx-2" />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareIcons;
