import React from 'react';
import '../styles.css';
import Button from './Button.js';
const ButtonHolder = () => {
  return (
    <div className="buttonHolder">
      <Button
        name={'Home Page'}
        link=""
      />
      <Button
          name={'Saved Housing'}
          link=""
      />
    </div>
  );
};

export default ButtonHolder;
