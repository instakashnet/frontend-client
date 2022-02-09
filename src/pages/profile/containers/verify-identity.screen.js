import React, { useCallback, useState } from "react";
import { RadioButtonUncheckedOutlined, RadioButtonCheckedOutlined } from "@material-ui/icons";

// REDUX
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/actions";

// ASSETS
import DniIcon from "../../../assets/images/icons/dni.svg";
import PassportIcon from "../../../assets/images/icons/passport.svg";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { UploadDocument } from "../components/forms/upload-document.component";
import { DocumentInReview } from "../components/document-in-review.component";

// CLASSES
import classes from "../assets/css/profile-components.module.scss";

export const VerifyIdentityScreen = ({ user }) => {
  const [docType, setDocType] = useState(""),
    dispatch = useDispatch();

  // HANDLERS
  const onDocUlpoad = useCallback(() => {
    let ModalComponent = () => <UploadDocument docType={docType} />;

    dispatch(openModal(ModalComponent));
  }, [docType, dispatch]);

  return (
    <div className={classes.VerifyIdentityWrapper}>
      {user.identityDocumentValidation === "pending" ? (
        <DocumentInReview />
      ) : (
        <>
          <h3>Selecciona tu documento</h3>
          <div className="flex items-center justify-center">
            {user.documentType.toLowerCase() !== "pasaporte" ? (
              <button className={classes.DocumentSelect} onClick={() => setDocType("dni")}>
                <div className="flex items-center">
                  <img src={DniIcon} width={25} alt="dni" className="mr-2" />
                  <div className="text-left">
                    <h4>Documento emitido por el gobierno</h4>
                    <p>DNI, CE, PTP</p>
                  </div>
                </div>
                {docType === "dni" ? <RadioButtonCheckedOutlined fontSize="medium" htmlColor="#20a2a5" /> : <RadioButtonUncheckedOutlined fontSize="medium" htmlColor="#20a2a5" />}
              </button>
            ) : (
              <button className={classes.DocumentSelect} onClick={() => setDocType("passport")}>
                <div className="flex items-center">
                  <img src={PassportIcon} width={20} alt="passport" className="mr-2" />
                  <h4>Pasaporte</h4>
                </div>
                {docType === "passport" ? (
                  <RadioButtonCheckedOutlined fontSize="medium" htmlColor="#20a2a5" />
                ) : (
                  <RadioButtonUncheckedOutlined fontSize="medium" htmlColor="#20a2a5" />
                )}
              </button>
            )}
          </div>
          <ul className="my-8">
            <li>El proceso de validación puede demorar hasta 5 minutos.</li>
            <li>Recibirás una notificación a tu correo cuando termine el proceso de validación.</li>
            <li>Este proceso se realiza una única vez, luego podrás hacer tus camibos sin límite.</li>
          </ul>
          <Button className="action-button" onClick={onDocUlpoad} disabled={!docType}>
            Comenzar verificación
          </Button>
        </>
      )}
    </div>
  );
};
