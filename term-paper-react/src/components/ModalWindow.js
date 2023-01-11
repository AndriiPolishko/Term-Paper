import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useAuthContext } from '../hooks/useAuthContext';

function ModalWindow() {
  const { user } = useAuthContext();
  const id = user.id;
  const [currentFirstName, setCurrentFirstName] = useState();
  const close = () => {
    //closeItsSelf();
  };

  const submit = async () => {
    await fetch('http://localhost:5000/api/user/' + id, {
      method: 'PUT',
      body: JSON.stringify({ firstName: currentFirstName }),
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    });
  };
  return (
    <div className="modalWindow">
      <section className="data" style={{ marginTop: '5px' }}>
        <h3>
          {`Input your new first name`}
          <ImCross
            style={{
              width: '15px',
              marginLeft: '5px',
              color: 'var(--red)',
            }}
            onClick={close}
          />
        </h3>
        <input
          type="text"
          style={{ width: '100%', height: '100%' }}
          onChange={(e) => {
            setCurrentFirstName(e.target.value);
          }}
        />
      </section>
      <button
        className="button"
        style={{ marginBottom: '5px' }}
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
}

export default ModalWindow;
