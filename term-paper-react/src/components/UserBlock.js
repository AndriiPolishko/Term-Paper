import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useAuthContext } from '../hooks/useAuthContext';

function UserBlock({ user }) {
  const { id, first_name, second_name, city, email, is_admin } = user;
  const linkToPhoto =
    'https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40=';

  const { currentUser } = useAuthContext();

  const deletion = async () => {
    await fetch('http://localhost:5000/api/user/' + id, {
      method: 'DELETE',
    });
  };
  return (
    <div className="ceil">
      <section className="ceilHead">
        <h3>
          {`${first_name} ${second_name}`}
          {!is_admin && (
            <ImCross
              style={{ color: 'var(--red)', marginLeft: '5px' }}
              onClick={deletion}
            />
          )}
        </h3>
      </section>
      <div className="ceilBody">
        <div className="ceilInfo">
          <p>Email: {email}</p>
          <p>City: {city}</p>
        </div>
      </div>
    </div>
  );
}

export default UserBlock;
