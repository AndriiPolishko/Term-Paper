import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
const ButtonHolder = () => {
  return (
    <div className="buttonHolder">
      <Link to="/">
        <button className="button marginRight10">Home Page</button>
      </Link>

      <button className="button marginRight10">Saved Housing</button>
    </div>
  );
};

export default ButtonHolder;
