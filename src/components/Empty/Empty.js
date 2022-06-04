import React from 'react';
import './Empty.css';

const Empty = ({ location }) => {
  return (
    <div className='empty-wrapper'>
      <p className='empty-wrapper__description'>
        В {location} пусто
      </p>
    </div>
  );
};

export default Empty;