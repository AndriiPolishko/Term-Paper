import React from 'react';
import '../../../components/styles.css';
import { useLogout } from '../../../hooks/useLogout';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';

function UserStuffHolder() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const onClick = async () => {
    await logout();
  };
  return (
    <div className="userStuffHolder">
      {user && (
        <>
          <Link to="/">
            <button className="button" onClick={onClick}>
              Log out
            </button>
          </Link>

          <div className="userProfile">{`${user.firstName} ${user.secondName}`}</div>
        </>
      )}
      {!user && (
        <>
          <Link to="/sign-up">
            <button className="button marginRight10">Sign up</button>
          </Link>
          <Link to="/log-in">
            <button className="button marginRight10">Log in</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default UserStuffHolder;
