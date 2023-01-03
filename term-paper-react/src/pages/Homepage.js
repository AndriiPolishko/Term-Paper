import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../components/styles.css';
import Main from '../components/main/Main';

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
