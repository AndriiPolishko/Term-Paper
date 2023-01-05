import '../styles.css';
import InputBar from './search_bar/InputBar';
import PseudoSelect from './pseudo_select/PseudoSelect';
import { useState, useEffect } from 'react';

const Main = () => {
  const [housings, setHousings] = useState(null);
  const housingTypes = [
    { id: 0, name: 'Buy Flat' },
    { id: 1, name: 'Rent Flat' },
    { id: 2, name: 'Buy House' },
    { id: 3, name: 'Rent House' },
  ];

  const cities = [
    { id: 0, name: 'Kyiv' },
    { id: 1, name: 'Lviv' },
    { id: 2, name: 'Kharkiv' },
    { id: 3, name: 'Kherson' },
    { id: 4, name: 'Rivne' },
    { id: 5, name: 'Zaporizhzhia' },
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
      <div className={'filtersHolder'}>
        <PseudoSelect optionsArray={housingTypes} title="Housing Type" />
        <InputBar optionsArray={cities} title="City" />
      </div>
      <div className="housingsContainer">
        {housings &&
          housings.map((housing) => <p key={housing.id}>{housing.name}</p>)}
      </div>
    </main>
  );
};

export default Main;
