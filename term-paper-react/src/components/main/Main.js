import '../styles.css';
import InputBar from './search_bar/InputBar';
import PseudoSelect from './pseudo_select/PseudoSelect';
import { useState, useEffect } from 'react';

import cities from '../../resources/cities.json'; //assert {type:'json'}

const Main = () => {
  const [housings, setHousings] = useState(null);
  const housingTypes = [
    { id: 0, name: 'Buy Flat' },
    { id: 1, name: 'Rent Flat' },
    { id: 2, name: 'Buy House' },
    { id: 3, name: 'Rent House' },
  ];

  // useEffect(() => {
  //   const fetchHousings = async () => {
  //     const response = await fetch('http://localhost:5000/api/housing');
  //     const json = await response.json();
  //     if (response.ok) {
  //       console.log(json);
  //       setHousings(json);
  //     }
  //   };
  //   fetchHousings();
  // }, []);

  return (
    <main className={'container'}>
      <div className={'findHousingFilters'}>
        <PseudoSelect optionsArray={housingTypes} title="Housing Type" />
        <InputBar optionsArray={cities.filteredCities} title="City" />
      </div>
      <div className="housingsContainer">
        {housings &&
          housings.map((housing) => <p key={housing.id}>{housing.name}</p>)}
      </div>
    </main>
  );
};

export default Main;
