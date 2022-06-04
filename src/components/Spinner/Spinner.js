import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div>
      <div className='spinner'></div>
      <p className='spinner-sign'>Loading...</p>
    </div>
  );
};

export default Spinner;