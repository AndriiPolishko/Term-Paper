import React from 'react';
import '../../../components/styles.css';
import { Link } from 'react-router-dom';

function UserIcon() {
  return (
    <Link to="/sign-up">
      <span id="userIcon"></span>
    </Link>
  );
}

export default UserIcon;
