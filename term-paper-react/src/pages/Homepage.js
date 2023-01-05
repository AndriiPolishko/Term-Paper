import React from 'react';
import PropTypes from 'prop-types';

import '../components/styles.css';
import Main from '../components/main/Main';

const Homepage = (props) => {
  return (
    <>
      <Main />
    </>
  );
};

Homepage.propTypes = { pageName: PropTypes.string };

export default Homepage;
