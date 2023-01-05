import React from 'react';
import PropTypes from 'prop-types';
import ButtonHolder from './ButtonHolder';
import UserStuffHolder from '../user_page_related/forHeader/UserStuffHolder';
import '../styles.css';

const Header = (props) => {
  return (
    <div className="header">
      <ButtonHolder />
      <UserStuffHolder />
    </div>
  );
};

Header.propTypes = { pageName: PropTypes.string };

export default Header;