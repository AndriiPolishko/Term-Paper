import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  return <div>{props.pageName}</div>;
};

Header.propTypes = { pageName: PropTypes.string };

Header.defaultProps = { pageName: "Default page" };

export default Header;
