import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './pseudoSelect.css';
const PseudoSelect = ({ optionsArray, title, passChildData }) => {
  const [fullTitle, setFullTitle] = useState(`Choose ${title}`);
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <div
      className={'filterWrap'}
      onMouseEnter={() => {
        setOptionsOpen(!optionsOpen);
      }}
      onMouseLeave={() => {
        setOptionsOpen(!optionsOpen);
      }}
    >
      <div className="pseudoSelectInput">
        <div className={('pseudoSelectTitle', 'leftMargin')}>{fullTitle}</div>
        <div className={('angleWrap', 'rightMargin')}>
          {optionsOpen ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </div>
      </div>
      {optionsOpen ? (
        <div className="options">
          {optionsArray.map((option) => {
            return (
              <div
                key={option.id}
                className="option"
                onClick={() => {
                  setFullTitle(option.name);
                  setOptionsOpen(!optionsOpen);
                  passChildData(option.name);
                }}
              >
                {' '}
                {option.name}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default PseudoSelect;
