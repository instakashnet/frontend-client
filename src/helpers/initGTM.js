import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID,
};

export default function initGTM() {
  TagManager.initialize(tagManagerArgs);
}
