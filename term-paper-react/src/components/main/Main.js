import InputBar from './search_bar/InputBar';
import PseudoSelect from './pseudo_select/PseudoSelect';
import PriceFilter from './PriceFilter';
import HousingContainer from './housing/HousingContainer';
import Pagination from './housing/Pagination';
import { useState, useEffect } from 'react';

import cities from '../../resources/cities.json';
import housingTypes from '../../resources/housingTypes.json';

const Main = () => {
  const [housings, setHousings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenCity, setChosenCity] = useState('');
  const [chosenHousingType, setChosenHousingType] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [housingsPerPage] = useState(3);
  const [highestPrice, setHighestPrice] = useState(Infinity);

  let indexOfLastHousing;
  let indexOfFirstHousing;
  let currentHousing;

  const search = (e) => {
    const fetchHousings = async () => {
      const response = await fetch(
        `http://localhost:5000/api/housing?` +
          new URLSearchParams({
            city: chosenCity,
            housingType: chosenHousingType,
            price: highestPrice,
          })
      );
      const json = await response.json();
      if (response.ok) {
        setHousings(json);
      }
    };

    setIsLoading(true);
    fetchHousings();
    setIsLoading(false);
  };

  if (housings) {
    indexOfLastHousing = currentPage * housingsPerPage;
    indexOfFirstHousing = indexOfLastHousing - housingsPerPage;
    currentHousing = housings.slice(indexOfFirstHousing, indexOfLastHousing);
  }

  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className={'container'}>
      <div className={'filtersContainer'}>
        <div className="filters">
          <PseudoSelect
            optionsArray={housingTypes.housingTypes}
            title="Housing Type"
            passChildData={setChosenHousingType}
          />
          <InputBar
            optionsArray={cities.filteredCities}
            title="City"
            passChildData={setChosenCity}
          />
          <PriceFilter passChildData={setHighestPrice} />
        </div>

        <button className="button widthFull height50" onClick={search}>
          Search
        </button>
      </div>
      <div className="content">
        {currentHousing && (
          <>
            <HousingContainer
              loading={isLoading}
              housings={currentHousing}
              showHeart={true}
            />
            <Pagination
              housingsPerPage={housingsPerPage}
              totalHousings={housings.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
