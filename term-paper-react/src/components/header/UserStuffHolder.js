import { FaHouseUser } from 'react-icons/fa';
import { ImExit, ImEnter } from 'react-icons/im';

import { useLogout } from '../../hooks/useLogout';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

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
            <button className="button marginRight10" onClick={onClick}>
              <span>Log out</span>
              <ImExit
                style={{ width: '15px', height: '15px', marginLeft: '2px' }}
              />
            </button>
          </Link>
          <Link to="/user">
            <button className="button">
              {`${user.firstName} ${user.secondName}`}{' '}
              <FaHouseUser style={{ width: '15px', height: '15px' }} />
            </button>
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link to="/sign-up">
            <button className="button marginRight10">
              Sign up <ImEnter />
            </button>
          </Link>
          <Link to="/log-in">
            <button className="button marginRight10">
              Log in <ImEnter />
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default UserStuffHolder;
