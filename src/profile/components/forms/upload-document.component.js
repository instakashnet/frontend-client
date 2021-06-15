import React, { useCallback, useState } from "react";
import { Upload, FileText, Clock } from "react-feather";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocumentInit } from "../../store/actions";

import classes from "../../assets/css/profile-components.module.scss";

const UploadDocument = ({ type }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const [percentage, setPercentage] = useState(0);

  const [file, setFile] = useState(null);
  const inputName = type === "frontal" ? "identity_photo" : "identity_photo_two";
  const onDrop = useCallback((acceptedFile) => setFile(acceptedFile), []);

  const uploadPhotoHandler = () => dispatch(uploadDocumentInit({ [inputName]: file[0] }, type, setPercentage));

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/jpeg, image/png", maxSize: 5242880, multiple: false });

  return (
    <>
      <div className={classes.AddFile}>
        <div className="flex justify-center px-6 cursor-pointer" {...getRootProps()}>
          <input {...getInputProps()} />
          {file ? (
            <span className="text-center">
              <FileText size={30} />
            </span>
          ) : (
            <span className="text-center">
              <Upload size={30} />
            </span>
          )}
        </div>
        {file ? (
          <>
            <h4>{file[0].name}</h4>
            {percentage > 0 && isProcessing ? (
              <p className="italic flex items-center">
                <Clock size={15} className="mr-1" style={{ color: "#676767" }} /> cargando foto: {percentage}%
              </p>
            ) : (
              <button type="button" className="flex items-center px-2 underline" onClick={uploadPhotoHandler}>
                cargar foto <Upload size={15} className="ml-2" />
              </button>
            )}
          </>
        ) : (
          <>
            <h4>
              Cargar <b>parte {type}</b>
            </h4>
            <p>.jpg o .png | máximo 5MB</p>
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(UploadDocument);
