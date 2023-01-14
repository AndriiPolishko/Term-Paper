import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
const ButtonHolder = () => {
  const { user } = useAuthContext();
  return (
    <div className="buttonHolder marginLeft40">
      <Link to="/">
        <button className="button marginRight10">Home Page</button>
      </Link>
      {user && (
        <Link to="/likedHousing">
          <button className="button marginRight10">Saved Housing</button>
        </Link>
      )}
      {user && user.isAdmin && (
        <>
          <Link to="/allUsers">
            <button
              className="button marginRight10"
              style={{
                backgroundColor: 'var(--yellow)',
                color: 'var(--black)',
              }}
            >
              Users
            </button>
          </Link>
          <Link to="/allRealtors">
            <button
              className="button marginRight10"
              style={{
                backgroundColor: 'var(--yellow)',
                color: 'var(--black)',
              }}
            >
              Realtors
            </button>
          </Link>
          <Link to="allHousings">
            <button
              className="button marginRight10"
              style={{
                backgroundColor: 'var(--yellow)',
                color: 'var(--black)',
              }}
            >
              Housings
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ButtonHolder;
