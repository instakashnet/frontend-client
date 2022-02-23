import React, { useCallback, useState } from "react";
import { CameraAlt } from "@material-ui/icons";

// REUDX
import { useDispatch, useSelector } from "react-redux";
import { uploadDocumentInit } from "../../../../store/actions";

// ASSETS && CLASSES
import CorrectDoc from "../../../../assets/images/illustrations/correct-doc.svg";
import IncorrectDoc from "../../../../assets/images/illustrations/incorrect-doc.svg";
import classes from "../../assets/css/profile-components.module.scss";

// COMPONENTS
import { DocumentCamera } from "./document-camera.component";
import { Button } from "../../../../components/UI/button.component";

export const UploadDocument = ({ docType }) => {
  const dispatch = useDispatch(),
    isProcessing = useSelector((state) => state.Profile.isProcessing),
    [openCamera, setOpenCamera] = useState(false),
    [photoSide, setPhotoSide] = useState(""),
    [frontPhoto, setFrontPhoto] = useState(null),
    [backPhoto, setBackPhoto] = useState(null);

  // HANDLERS
  const onTakePhoto = async (side) => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((dvc) => dvc.kind === "videoinput");

        if (!videoDevices) alert("Debes user un dispoitivo con camara para poder validar tu identidad.");
        setOpenCamera(true);
        setPhotoSide(side);
      } catch (error) {
        console.log(error);
      }
    },
    setPhoto = useCallback(
      (image) => {
        if (photoSide === "front") setFrontPhoto(image);
        if (photoSide === "back") setBackPhoto(image);
        setOpenCamera(false);
      },
      [photoSide]
    ),
    uploadDocument = useCallback(() => {
      dispatch(uploadDocumentInit({ front: frontPhoto, back: backPhoto }, docType));
    }, [frontPhoto, backPhoto, docType, dispatch]);

  return (
    <div className={classes.UploadDocWrapper}>
      {!openCamera ? (
        <>
          <h2>Toma una foto</h2>
          <p>Sube una foto de tu documento siguiendo las indicaciones para evitar que pueda haber rechazos en la verificación de tu identidad.</p>
          <div className="flex items-center justify-center my-3">
            <img src={CorrectDoc} width={125} alt="documento correcto" className="mx-2" />
            <img src={IncorrectDoc} width={100} alt="documento incorrecto" className="mx-2" />
          </div>
          <h3>¡Importante!</h3>
          <ul className="my-2">
            <li>La fotografía no debe estar borrosa, desenfocada ni pixelada.</li>
            <li>Verifique que la fotografía sea cercana y que no hayan otros elementos en la imagen.</li>
            <li>Toda la información que aparece en el documento debe ser totalmente legible.</li>
            <li>El tipo y nro. de documento capturado debe ser el mismo usado en tu registro.</li>
            <li>La imagen no debe pesar más de 10MB.</li>
          </ul>
          {docType === "passport" ? (
            <button onClick={() => onTakePhoto("front")} className={classes.PassportButton}>
              {frontPhoto ? (
                <img src={frontPhoto} alt="foto pasaporte" />
              ) : (
                <>
                  <CameraAlt fontSize="small" htmlColor="#20a2a5" />
                  <p>Tomar foto pasaporte</p>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center">
              <button onClick={() => onTakePhoto("front")} className={classes.PhotoButtonSquare}>
                {frontPhoto ? (
                  <img src={frontPhoto} alt="foto frontal" />
                ) : (
                  <>
                    <CameraAlt fontSize="small" htmlColor="#20a2a5" />
                    <p>Toma foto frontal</p>
                  </>
                )}
              </button>
              <button onClick={() => onTakePhoto("back")} className={classes.PhotoButtonSquare}>
                {backPhoto ? (
                  <img src={backPhoto} alt="foto reversa" />
                ) : (
                  <>
                    <CameraAlt fontSize="small" htmlColor="#20a2a5" />
                    <p>Tomar foto reverso</p>
                  </>
                )}
              </button>
            </div>
          )}
          <Button className={`action-button mt-6 ld-over ${isProcessing ? "running" : ""}`} onClick={uploadDocument} disabled={(docType === "dni" && !backPhoto) || !frontPhoto}>
            <span className="ld ld-ring ld-spin" />
            Subir documento
          </Button>
        </>
      ) : (
        <DocumentCamera setPhoto={setPhoto} />
      )}
    </div>
  );
};
