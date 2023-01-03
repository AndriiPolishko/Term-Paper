import React from 'react';
import '../styles.css';
import Button from './Button.js';
import { Link } from 'react-router-dom';
const ButtonHolder = () => {
  return (
    <div className="buttonHolder">
      <Link to="/">
        <Button name={'Home Page'} />
      </Link>

      <Button name={'Saved Housing'} />
    </div>
  );
};

export default ButtonHolder;
