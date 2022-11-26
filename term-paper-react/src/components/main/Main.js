import React from 'react';
import '../styles.css';
import SearchBar from './search_bar/SearchBar';
import PseudoSelect from './pseudo_select/PseudoSelect';

const Main = () => {
  const housingTypes = [
    { id: 1, name: 'Buy Flat' },
    { id: 2, name: 'Rent Flat' },
    { id: 3, name: 'Buy House' },
    { id: 4, name: 'Rent House' },
  ];

  return (
    <div className={'container'}>
      <div className={'filtersHolder'}></div>
      <PseudoSelect optionsArray={housingTypes} title="Housing Type" />
    </div>
  );
};

export default Main;
