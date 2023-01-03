// !!!NOT COMPLETED!!!///
// !!!NOT COMPLETED!!!///
// !!!NOT COMPLETED!!!///
import { useState } from 'react';
import '../../styles.css';
import './inputBar.css';
const InputBar = ({ optionsArray, title }) => {
  const [isOptionsOpen, toggleIsOptionsOpen] = useState(false);
  const [placeholder] = useState(`Enter the ${title}`);
  const [inputted, setInputted] = useState('');

  function onChangeInputValue(e) {
    const value = e.target.value;
    setInputted(value);
  }

  return (
    <div
      className="filterWrap"
      onMouseEnter={() => {
        isOptionsOpen === false && toggleIsOptionsOpen(!isOptionsOpen);
      }}
      onMouseLeave={() => {
        isOptionsOpen === true && toggleIsOptionsOpen(!isOptionsOpen);
      }}
    >
      <label className="searchBarInputLabel" htmlFor="name" />
      <div className=""></div>
      <input
        name="name"
        type={'text'}
        autoComplete="off"
        placeholder={placeholder}
        className={'searchBarInput'}
        value={inputted}
        onChange={onChangeInputValue}
      />
      {isOptionsOpen ? (
        <div className="options">
          {optionsArray.map((option) =>
            option.name
              .toLocaleLowerCase()
              .startsWith(inputted.toLocaleLowerCase()) ? (
              <div
                key={option.id}
                id={option.id}
                className={'option'}
                onClick={() => {
                  console.log('hi');
                  setInputted(option.name);
                  toggleIsOptionsOpen(!isOptionsOpen);
                }}
              >
                {option.name}
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};

export default InputBar;
