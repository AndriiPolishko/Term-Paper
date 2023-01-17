import React from 'react';
import UserBlock from './UserBlock';
function UserContainer({ loading, users, type, passChildParam }) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  const safeUsers = users === undefined ? [] : users;

  return (
    <div className="housingsContainer">
      {safeUsers.map((user) => (
        <UserBlock
          user={user}
          key={user.id}
          type={type}
          passChildParam={passChildParam}
        />
      ))}
    </div>
  );
}

export default UserContainer;
