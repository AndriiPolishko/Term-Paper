import { useState, useEffect } from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';
import InputBar from './filters/InputBar';
import PseudoSelect from './filters/PseudoSelect';
import PriceFilter from './filters/PriceFilter';
import HousingContainer from './housing/HousingContainer';
import Pagination from './housing/Pagination';

import RealtorContainer from './realtor/RealtorContainer';

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

  const [searchRealtorsDisable, setSearchRealtorsDisable] = useState(true);
  const [score, setScore] = useState();
  const [realtorEmail, setRealtorEmail] = useState();
  const [realtors, setRealtors] = useState();

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
        setRealtors(undefined);
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
      if (json.result) setOnlyIds(json.result.map((ell) => ell.id));
    };
    setIsLoading(true);
    if (user) getLikedHousing();
    setIsLoading(false);
  }, [likedHousing, user]);

  const searchRealtors = async () => {
    const res = await fetch(
      'http://localhost:5000/api/realtor/byEmailAndScore?' +
        new URLSearchParams({ email: realtorEmail, score })
    );
    const json = await res.json();
    setHousings(undefined);
    setRealtors(json);
  };

  const validateRealtorFields = (e) => {
    if (e.target.id === 'scoreFilter') {
      const value = e.target.value;
      if (+value >= 1 && +value <= 5 && /^[0-9]+$/.test(value)) {
        setScore(value);
      } else {
        setScore(undefined);
      }
    } else if (e.target.id === 'realtorEmail') {
      const value = e.target.value;
      if (
        value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setRealtorEmail(value);
      } else {
        setRealtorEmail(undefined);
      }
    }
    if (score) {
      setSearchRealtorsDisable(false);
    } else {
      setSearchRealtorsDisable(true);
    }
  };

  return (
    <main className={'container'}>
      <div className={'filtersContainer'}>
        <div className="filters" onMouseLeave={validateRealtorFields}>
          <div className="innerContainer">
            <h4>Hosing filters</h4>
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
          <div className="innerContainer" style={{ marginTop: '5px' }}>
            <h4>Realtor filters</h4>
            <div className="filterWrap">
              <input
                type="email"
                id="realtorEmail"
                className="searchBarInput"
                placeholder={'Input the realtors email'}
                onChange={validateRealtorFields}
                onMouseLeave={validateRealtorFields}
              />
            </div>
            <div className="filterWrap">
              <input
                type="number"
                id="scoreFilter"
                className="searchBarInput"
                placeholder={'Input the lower score boundary'}
                onChange={validateRealtorFields}
                onMouseLeave={validateRealtorFields}
                onFocus={validateRealtorFields}
                onBlur={validateRealtorFields}
                max={5}
                min={1}
              />
            </div>
          </div>
        </div>

        <button className="button widthFull height50" onClick={search}>
          Search Housings
        </button>
        <button
          className={
            searchRealtorsDisable
              ? 'button widthFull height50 blocked'
              : 'button widthFull height50'
          }
          onClick={searchRealtors}
          disabled={searchRealtorsDisable}
        >
          Search Realtors
        </button>
      </div>
      <div className="content">
        {currentHousing && (
          <>
            <HousingContainer
              loading={isLoading}
              housings={currentHousing}
              likeOrCross={true}
              likedHousing={likedHousing}
            />
            <Pagination
              itemsPerPage={housingsPerPage}
              totalItems={housings.length}
              paginate={paginate}
              updateLikedHousings={updateLikedHousings}
            />
          </>
        )}
        {realtors && (
          <>
            <RealtorContainer loading={isLoading} realtors={realtors} />
            <Pagination
              itemsPerPage={4}
              totalItems={realtors.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
