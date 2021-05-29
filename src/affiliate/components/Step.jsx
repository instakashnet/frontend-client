import React from 'react';

const Step = ({ img, title, children }) => {
  return (
    <>
      <img src={img} alt={title || 'pasos'} />
      {title && <h4>{title}</h4>}
      {children}
    </>
  );
};

export default Step;
