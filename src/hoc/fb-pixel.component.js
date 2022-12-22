import React, { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID_MAIN, {}, { autoConfig: true, debug: true });
ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID_WEBTILIA, {}, { autoConfig: true, debug: true });

export default function FbPixel({ children }) {
  // EFFECTS
  useEffect(() => {
    ReactPixel.pageView();
  }, []);

  return <>{children}</>;
}
