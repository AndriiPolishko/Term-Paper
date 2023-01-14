import { useEffect, useState } from 'react';
import HousingContainer from '../../components/main/housing/HousingContainer';
import Pagination from '../../components/main/housing/Pagination';

function Housings() {
  const [housings, setHousings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  useEffect(() => {
    const fetchHousings = async () => {
      const res = await fetch('http://localhost:5000/api/housing');
      const json = await res.json();
      setHousings(json);
    };
    setIsLoading(true);
    fetchHousings();
    setIsLoading(false);
  }, []);

  let indexOfLastHousing, indexOfFirstHousing, currentHousing;
  if (housings) {
    indexOfLastHousing = currentPage * itemsPerPage;
    indexOfFirstHousing = indexOfLastHousing - itemsPerPage;
    currentHousing = housings.slice(indexOfFirstHousing, indexOfLastHousing);
  }
  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className={'container'}>
      <div className="content">
        <HousingContainer
          loading={isLoading}
          housings={currentHousing}
          likeOfCross={true}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={housings.length}
          paginate={paginate}
        />
      </div>
    </main>
  );
}

export default Housings;
