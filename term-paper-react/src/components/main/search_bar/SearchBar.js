// !!!NOT COMPLETED!!!///
// !!!NOT COMPLETED!!!///
// !!!NOT COMPLETED!!!///
import { useState } from 'react';
import '../../styles.css';
import './searchBar.css';
const SearchBar = ({ groupName }) => {
  const list = [
    { id: 0, name: 'Kyiv', checked: false },
    { id: 1, name: 'Lviv', checked: false },
    { id: 2, name: 'Kharkiv', checked: false },
    { id: 3, name: 'Uzhorod', checked: false },
    { id: 4, name: 'Kherson', checked: false },
    { id: 5, name: 'Donetsk', checked: false },
    { id: 6, name: 'Zaporizha', checked: false },
    { id: 7, name: 'Ivano-Frankivsk', checked: false },
    { id: 8, name: 'Luhansk', checked: false },
  ];
  const [isOptionsOpen, toggleIsListOpen] = useState(false);
  const [title, setTitle] = useState(`Enter the ${groupName}`);
  const [option, setOption] = useState('');

  function onChangeInputValue(e) {
    const value = e.target.value;
    setOption(value);
  }

  return (
    <div className="searchBarWrap">
      <label
        className="searchBarInputLabel"
        htmlFor="name"
      >{`Choose the ${groupName}`}</label>
      <input
        name="name"
        type={'text'}
        autoComplete="off"
        defaultValue={title}
        className={'searchBarInput'}
        onFocus={() => {
          toggleIsListOpen(!isOptionsOpen);
        }}
        //onBlur={() => toggleIsListOpen(!isOptionsOpen)}
        onChange={onChangeInputValue}
      />
      {isOptionsOpen ? (
        <div className="options">
          {list.map((item) =>
            item.name
              .toLocaleLowerCase()
              .startsWith(option.toLocaleLowerCase()) ? (
              <div
                key={item.id}
                id={item.id}
                className={'option'}
                onClick={() => {
                  setTitle(item.name);
                }}
              >
                {item.name}
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
