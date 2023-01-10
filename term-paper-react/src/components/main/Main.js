import { useState, useEffect } from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';
import InputBar from './search_bar/InputBar';
import PseudoSelect from './pseudo_select/PseudoSelect';
import PriceFilter from './PriceFilter';
import HousingContainer from './housing/HousingContainer';
import Pagination from './housing/Pagination';

import cities from '../../resources/cities.json';
import housingTypes from '../../resources/housingTypes.json';

const Main = () => {
  const { user } = useAuthContext();

  const [housings, setHousings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenCity, setChosenCity] = useState('');
  const [chosenHousingType, setChosenHousingType] = useState('');
  const [likedHousing, setLikedHousing] = useState();
  const [onlyIds, setOnlyIds] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [housingsPerPage] = useState(3);

  const [highestPrice, setHighestPrice] = useState(undefined);

  let indexOfLastHousing;
  let indexOfFirstHousing;
  let currentHousing;

  const updateLikedHousings = () => {
    setLikedHousing(onlyIds);
  };

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
      updateLikedHousings();
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

  useEffect(() => {
    const getLikedHousing = async () => {
      const res = await fetch(
        'http://localhost:5000/api/liked-housing?' +
          new URLSearchParams({ userId: user.id })
      );
      const json = await res.json();
      setOnlyIds(json.result.map((ell) => ell.id));
    };
    setIsLoading(true);
    getLikedHousing();
    setIsLoading(false);
  }, [user.id, likedHousing]);

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
              likedHousing={likedHousing}
            />
            <Pagination
              housingsPerPage={housingsPerPage}
              totalHousings={housings.length}
              paginate={paginate}
              updateLikedHousings={updateLikedHousings}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
