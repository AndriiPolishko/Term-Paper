import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import PasswordModal from '../components/modals/PasswordModal';
import TextModal from '../components/modals/TextModal';

function UserPage() {
  const { user } = useAuthContext();
  const [firstNameDialogWindowOn, setFirstNameDialogWindowOn] = useState(false);
  const [secondNameDialogWindowOn, setSecondNameDialogWindowOn] =
    useState(false);
  const [emailDialogWindowOn, setEmailDialogWindowOn] = useState(false);
  const [cityDialogWindowOn, setCityDialogWindowOn] = useState(false);
  const [passwordDialogWindowOn, setPasswordDialogWindowOn] = useState(false);

  const toggleTheButton = (val, func1, func2, func3, func4, func5) => {
    func1(!val);
    func2(false);
    func3(false);
    func4(false);
    func5(false);
  };

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
        {!user.isAdmin && (
          <div className="buttonContainer flexColumn ">
            <button
              className="button marginBottom10"
              onClick={() => {
                toggleTheButton(
                  firstNameDialogWindowOn,
                  setFirstNameDialogWindowOn,
                  setSecondNameDialogWindowOn,
                  setEmailDialogWindowOn,
                  setPasswordDialogWindowOn,
                  setCityDialogWindowOn
                );
              }}
            >
              Change first name
            </button>
            <button
              className="button marginBottom10"
              onClick={() => {
                toggleTheButton(
                  secondNameDialogWindowOn,
                  setSecondNameDialogWindowOn,
                  setFirstNameDialogWindowOn,
                  setEmailDialogWindowOn,
                  setPasswordDialogWindowOn,
                  setCityDialogWindowOn
                );
              }}
            >
              Change second name
            </button>
            <button
              className="button marginBottom10"
              onClick={() => {
                toggleTheButton(
                  emailDialogWindowOn,
                  setEmailDialogWindowOn,
                  setFirstNameDialogWindowOn,
                  setSecondNameDialogWindowOn,
                  setPasswordDialogWindowOn,
                  setCityDialogWindowOn
                );
              }}
            >
              Change email
            </button>
            <button
              className="button marginBottom10"
              onClick={() => {
                toggleTheButton(
                  cityDialogWindowOn,
                  setCityDialogWindowOn,
                  setSecondNameDialogWindowOn,
                  setEmailDialogWindowOn,
                  setFirstNameDialogWindowOn,
                  setPasswordDialogWindowOn
                );
              }}
            >
              Change city
            </button>
            <button
              className="button marginBottom10"
              onClick={() => {
                toggleTheButton(
                  passwordDialogWindowOn,
                  setPasswordDialogWindowOn,
                  setSecondNameDialogWindowOn,
                  setFirstNameDialogWindowOn,
                  setEmailDialogWindowOn,
                  setCityDialogWindowOn
                );
              }}
            >
              Change password
            </button>
          </div>
        )}
      </div>
      {firstNameDialogWindowOn && (
        <TextModal
          value={'first name'}
          close={setFirstNameDialogWindowOn}
          updateParam={'firstName'}
        />
      )}
      {secondNameDialogWindowOn && (
        <TextModal
          value={'second name'}
          close={setSecondNameDialogWindowOn}
          updateParam={'secondName'}
        />
      )}
      {cityDialogWindowOn && (
        <TextModal
          value={'city'}
          close={setCityDialogWindowOn}
          updateParam={'city'}
        />
      )}
      {emailDialogWindowOn && (
        <TextModal
          value={'email'}
          close={setEmailDialogWindowOn}
          updateParam={'email'}
        />
      )}
      {passwordDialogWindowOn && (
        <PasswordModal close={setPasswordDialogWindowOn} />
      )}
    </main>
  );
}

export default UserPage;
