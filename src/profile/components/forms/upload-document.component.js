import React, { useCallback, useState } from "react";
import { CameraAlt } from "@material-ui/icons";

// REUDX
import { useDispatch, useSelector } from "react-redux";
import { uploadDocumentInit } from "../../../store/actions";

// ASSETS
import CorrectDoc from "../../../assets/images/illustrations/correct-doc.svg";
import IncorrectDoc from "../../../assets/images/illustrations/incorrect-doc.svg";

// COMPONENTS
import { DocumentCamera } from "./document-camera.component";
import { Button } from "../../../components/UI/button.component";

// CLASSES
import classes from "../../assets/css/profile-components.module.scss";

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
          <ul className="my-5">
            <li>La fotografía no debe estar borrosa, desenfocada ni pixelada.</li>
            <li>Toda la información que aparece en el documento debe ser totalmente legigle.</li>
            <li>El tipo y nro. de documento capturado debe ser el mismo usado en tu registro.</li>
            <li>La foto no debe pesar más de 10MB.</li>
          </ul>
          {docType === "passport" ? (
            <button onClick={() => onTakePhoto("front")} className={classes.PassportButton}>
              {frontPhoto ? (
                <img src={frontPhoto} alt="foto pasaporte" />
              ) : (
                <>
                  <CameraAlt fontSize="small" htmlColor="#20a2a5" />
                  <p>Foto pasaporte</p>
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
                    <p>Foto frontal</p>
                  </>
                )}
              </button>
              <button onClick={() => onTakePhoto("back")} className={classes.PhotoButtonSquare}>
                {backPhoto ? (
                  <img src={backPhoto} alt="foto reversa" />
                ) : (
                  <>
                    <CameraAlt fontSize="small" htmlColor="#20a2a5" />
                    <p>Foto reverso</p>
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
