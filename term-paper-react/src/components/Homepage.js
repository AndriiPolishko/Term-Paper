import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './styles.css';
import Main from './main/Main';

const Homepage = (props) => {
  return (
    <div className="body">
      <Header />
      <Main />
    </div>
  );
};

Homepage.propTypes = { pageName: PropTypes.string };

export default Homepage;
