import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

const Button = ({ name }) => {
  return <button className="headerButton">{name}</button>;
};

export default Button;

Button.propTypes = {
  name: PropTypes.string,
};

Button.defaultProps = {
  name: 'default button',
};
