import { RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// ASSETS
import DniIcon from "../../../assets/images/icons/dni.svg";
import PassportIcon from "../../../assets/images/icons/passport.svg";
// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { Modal } from "../../../components/UI/modals/modal.component";
// REDUX ACTION
import { openModal } from "../../../store/actions";
// COMPONENTS
import { DocumentInReview } from "../components/document-in-review.component";
import { UploadDocument } from "../components/forms/upload-document.component";
// CLASSES
import classes from "./modules/verify-identity.screen.module.scss";

export const VerifyIdentityScreen = ({ user, history }) => {
  const [docType, setDocType] = useState(""),
    dispatch = useDispatch(),
    validating = useSelector((state) => state.Profile.validating);

  const ModalComponent = useSelector((state) => state.Modal.Component);

  // HANDLERS
  const onDocUpload = useCallback(() => {
    let modalContent = () => <UploadDocument title="Verificar identidad" docType={docType} />;

    dispatch(openModal(modalContent));
  }, [docType, dispatch]);

  // EFFECTS
  useEffect(() => {
    if (user.identityDocumentValidation === "success") history.replace("/my-profile");
  }, [user.identityDocumentValidation, history]);

  return (
    <div className={classes.VerifyIdentityWrapper}>
      {user.identityDocumentValidation === "pending" || validating ? (
        <DocumentInReview />
      ) : (
        <>
          <h2>Tipo de documento</h2>
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
          <section className="my-8 px-3 md:px-6">
            <h3 className="text-left">Debes tener en cuenta</h3>
            <ul>
              <li>El proceso de validación puede demorar hasta 5 minutos.</li>
              <li>Recibirás una notificación a tu correo cuando termine el proceso de validación.</li>
              <li>Este proceso se realiza una única vez, luego podrás hacer tus cambios sin límite.</li>
            </ul>
          </section>
          <Button className="action-button" onClick={onDocUpload} disabled={!docType}>
            {user.identityDocumentValidation === "failed" ? "Verificar de nuevo" : "Comenzar verificación"}
          </Button>
        </>
      )}
      {ModalComponent && (
        <Modal {...ModalComponent().props}>
          <ModalComponent />
        </Modal>
      )}
    </div>
  );
};
