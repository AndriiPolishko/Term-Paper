import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

const Button = ({ name, link }) => {
  return (
    <a href={link}>
      <button className="headerButton">{name}</button>
    </a>
  );
};

export default Button;

Button.propTypes = {
  name: PropTypes.string,
};

Button.defaultProps = {
  name: 'default button',
};
