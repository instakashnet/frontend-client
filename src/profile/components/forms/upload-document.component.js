import React, { useCallback, useState } from "react";
import { Upload, FileText, Clock } from "react-feather";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocumentInit } from "../../store/actions";

import Card from "../../../core/components/UI/card.component";

import classes from "../../assets/css/profile-components.module.scss";

const UploadDocument = ({ type, documentUrl, profileId }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const [percentage, setPercentage] = useState(0);
  const [file, setFile] = useState(null);

  const inputName = type === "frontal" ? "identity_photo" : "identity_photo_two";
  const onDrop = useCallback(
    (acceptedFile) => {
      setFile(acceptedFile[0]);
      dispatch(uploadDocumentInit({ [inputName]: acceptedFile[0], profileId }, type, setFile, setPercentage));
    },
    [dispatch, inputName, type, profileId]
  );

  const FileIcon = file || documentUrl ? <FileText size={30} /> : <Upload size={30} />;

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/jpeg, image/png", maxSize: 5242880, multiple: false });

  return (
    <Card className={classes.AddFile}>
      <div className="flex justify-center px-6 cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        <span className="text-center">{FileIcon}</span>
      </div>
      {file ? (
        <>
          <h4>{`${file.name.substring(0, 14)}${file.name.length > 15 ? "...." : ""}`}</h4>
          <p>.jpg o .png | máximo 5MB</p>
          {isProcessing && (
            <p className="italic mt-2 flex font-bold items-center">
              <Clock size={15} className="mr-1" style={{ color: "#676767" }} /> cargando foto: {percentage}%
            </p>
          )}
        </>
      ) : documentUrl ? (
        <h4>
          Foto <b>{type}</b> cargada
        </h4>
      ) : (
        <h4>
          Cargar <b>foto {type}</b>
        </h4>
      )}
    </Card>
  );
};

export default React.memo(UploadDocument);
