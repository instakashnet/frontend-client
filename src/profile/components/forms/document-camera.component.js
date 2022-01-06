import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";

// CLASSES
import classes from "../../assets/css/profile-components.module.scss";

const videoConstraints = {
  width: 1024,
  height: 1024,
  facingMode: "environment",
};

export const DocumentCamera = ({ setPhoto }) => {
  const [preview, setPreview] = useState(null),
    webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
  }, [webcamRef]);

  return (
    <div className={classes.CameraWrapper}>
      {!preview ? (
        <>
          <h2>Tomar foto</h2>
          <Webcam audio={false} height={1024} ref={webcamRef} screenshotFormat="image/jpeg" width={1024} videoConstraints={videoConstraints} forceScreenshotSourceSize />
          <Button className="action-button mt-8" onClick={capture}>
            Tomar foto
          </Button>
        </>
      ) : (
        <>
          <h2>Revisa tu foto</h2>
          <img alt="preview" src={preview} />
          <div className="flex flex-col justify-center items-center mt-8">
            <Button className="secondary-button" onClick={() => setPreview(null)}>
              Tomarla de nuevo
            </Button>
            <Button className="action-button mt-4" onClick={() => setPhoto(preview)}>
              Se ve bien
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
