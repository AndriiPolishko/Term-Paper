import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import ModalWindow from '../components/ModalWindow';

function UserPage() {
  const { user } = useAuthContext();
  return (
    <main className={'container '}>
      <div className="userData">
        <div className="fieldHolder">
          <span>First name: </span>
          <span>{user.firstName}</span>
        </div>
        <div className="fieldHolder">
          <span>Second name: </span>
          <span>{user.secondName}</span>
        </div>
        <div className="fieldHolder">
          <span>Email: </span>
          <span>{user.email}</span>
        </div>
        <div className="fieldHolder">
          <span>City: </span>
          <span>{user.city}</span>
        </div>
        <div className="buttonContainer flexColumn ">
          <button className="button marginBottom10">Change name</button>
          <button className="button marginBottom10">Change email</button>
          <button className="button marginBottom10">Change password</button>
        </div>
      </div>
      {/* <ModalWindow /> */}
    </main>
  );
}

export default UserPage;
