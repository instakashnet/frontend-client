import React from 'react';
import { ClockLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className='flex items-center justify-center h-48'>
      <ClockLoader size={80} color='#0d8284' />
    </div>
  );
};

export default Spinner;
