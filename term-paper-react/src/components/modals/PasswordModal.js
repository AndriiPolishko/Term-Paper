import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useAuthContext } from '../../hooks/useAuthContext';

function PasswordModal({ close }) {
  const { user } = useAuthContext();
  const id = user.id;
  const { dispatch } = useAuthContext();

  const [oldPassword, setOldPassword] = useState();
  const [repeatOldPassword, setRepeatOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [disabled, setDisabled] = useState(true);

  const submit = async () => {
    const updateObject = { password: newPassword };
    const response = await fetch(
      'http://localhost:5000/api/user/password/' + id,
      {
        method: 'PUT',
        body: JSON.stringify(updateObject),
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({ type: 'LOGIN', payload: json });
    }
    close(false);
  };

  const validate = () => {
    if (oldPassword === repeatOldPassword && newPassword.length > 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="modalWindow">
      <section className="data" style={{ marginTop: '5px' }}>
        <div className="heading">
          <h3>{`Input your new password`}</h3>
          <ImCross
            className={'cross'}
            onClick={() => {
              close(false);
            }}
          />
        </div>
        <form className="modalForm">
          <input
            type={'password'}
            placeholder={'Enter the old password'}
            style={{ width: '350px', height: '100%' }}
            onChange={(e) => {
              setOldPassword(e.target.value);
              validate();
            }}
          />
          <input
            type={'password'}
            placeholder={'Repeat the old again'}
            style={{ marginTop: '3px', width: '350px', height: '100%' }}
            onChange={(e) => {
              setRepeatOldPassword(e.target.value);
              validate();
            }}
          />
          <input
            type={'password'}
            placeholder={'Enter new password'}
            style={{ marginTop: '3px', width: '350px', height: '100%' }}
            onChange={(e) => {
              setNewPassword(e.target.value);
              validate();
            }}
          />
          <button
            className={disabled ? 'button blocked' : 'button'}
            disabled={disabled}
            type="submit"
            style={{ marginTop: '5px', width: '100px' }}
            onClick={submit}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default PasswordModal;
