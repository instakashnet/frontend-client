import React from 'react';
import { ClockLoader } from 'react-spinners';

const Spinner = ({ full, screen }) => {
  return (
    <div className={`flex items-center justify-center ${screen ? 'h-screen' : ''} ${full ? 'max-h-full' : ''}`}>
      <ClockLoader size={85} color='#0d8284' />
    </div>
  );
};

export default Spinner;
