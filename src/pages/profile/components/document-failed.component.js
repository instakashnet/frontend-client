import React, { useState } from "react";

export const DocumentFailed = () => {
  const [show, setShow] = useState(true);

  return show ? (
    <div className="bg-red-100 border-t-4 border-red-500 mx-auto text-red-700 px-3 py-2 rounded relative top-0 right-0 mb-4 w-full md:w-4/6" role="alert">
      <div className="flex">
        <div className="pr-1 text-left">
          <strong className="font-bold">Error en la verificación. </strong>
          <span className="block sm:inline">Revisa tu correo para más información.</span>
        </div>
        <button className="absolute top-0 right-0 px-4 py-2" onClick={() => setShow(false)}>
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Cerrar</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
    </div>
  ) : null;
};
