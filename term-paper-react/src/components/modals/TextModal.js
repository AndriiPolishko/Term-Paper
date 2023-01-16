import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useAuthContext } from '../../hooks/useAuthContext';

function TextModal({ value, close, updateParam }) {
  const { user } = useAuthContext();
  const id = user.id;
  const [currentValue, setCurrentValue] = useState();
  const [disabled, setDisabled] = useState(true);
  const { dispatch } = useAuthContext();

  const submit = async () => {
    const updateObject = { [updateParam]: currentValue };
    const response = await fetch('http://localhost:5000/api/user/' + id, {
      method: 'PUT',
      body: JSON.stringify(updateObject),
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    });

    const json = await response.json();

    localStorage.setItem('user', JSON.stringify(json));

    dispatch({ type: 'LOGIN', payload: json });
    close(false);
  };

  const validation = (e) => {
    const value = e.target.value;
    if (
      updateParam === 'firstName' ||
      updateParam === 'secondName' ||
      updateParam === 'city'
    ) {
      setCurrentValue(`${value[0].toUpperCase()}${value.slice(1)}`);
      if (/^[a-zA-Z]+$/.test(currentValue) && currentValue.length > 1) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (updateParam === 'email') {
      setCurrentValue(value);
      if (
        currentValue
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  };

  return (
    <div className="modalWindow">
      <section style={{ marginTop: '5px' }}>
        <div className="heading">
          <h3>{`Input your new ${value}`}</h3>
          <ImCross
            className={'cross'}
            onClick={() => {
              close(false);
            }}
          />
        </div>
        <form className="modalForm">
          <input
            type={'text'}
            style={{ width: '350px', height: '100%' }}
            onChange={validation}
            onPaste={validation}
          />
          <button
            className={disabled ? 'button blocked ' : 'button'}
            type="submit"
            style={{ marginTop: '10px', width: '100px' }}
            onClick={submit}
            disabled={disabled}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default TextModal;
