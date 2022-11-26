import { useState } from 'react';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import './dropdownStyles.css';

const DropDown = ({ title, list, toggleCheck }) => {
  const [headerTitle] = useState(title);
  const [isListOpen, ToggleList] = useState(false);
  return (
    <div className={'dd-wrapper'}>
      <button
        className={'dd-header'}
        type={'button'}
        onClick={() => {
          ToggleList(!isListOpen);
        }}
      >
        <div className={'dd-headerTitle'}>{headerTitle}</div>
        {isListOpen ? (
          <FontAwesomeIcon icon={faAngleUp} className={'dd-headerTitleAngle'} />
        ) : (
          <FontAwesomeIcon
            icon={faAngleDown}
            className={'dd-headerTitleAngle'}
          />
        )}
      </button>

      {isListOpen ? (
        <div role={'list'} className={'dd-list'}>
          {list.map((element) => {
            return (
              <button
                type={'button'}
                key={element.id}
                id={element.id - 1}
                className={'dd-listItem'}
                onClick={toggleCheck}
              >
                {element.checked.toString()}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

DropDown.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(Object),
};

export default DropDown;
