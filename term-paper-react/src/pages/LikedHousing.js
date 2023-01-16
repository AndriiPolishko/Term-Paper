import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import HousingContainer from '../components/main/housing/HousingContainer';
import Pagination from '../components/main/housing/Pagination';
function LikedHousing() {
  const [likedHousing, setLikedHousing] = useState();
  const [onlyIds, setOnlyIds] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const housingsPerPage = 3;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    const getLikedHousing = async () => {
      const res = await fetch(
        'http://localhost:5000/api/liked-housing?' +
          new URLSearchParams({ userId: user.id })
      );
      const json = await res.json();
      setLikedHousing(json.result);
      setOnlyIds(json.result.map((ell) => ell.id));
    };
    setIsLoading(true);
    getLikedHousing();
    setIsLoading(false);
  }, [user.id]);

  let indexOfLastHousing, indexOfFirstHousing, currentHousing;
  if (likedHousing) {
    indexOfLastHousing = currentPage * housingsPerPage;
    indexOfFirstHousing = indexOfLastHousing - housingsPerPage;
    currentHousing = likedHousing.slice(
      indexOfFirstHousing,
      indexOfLastHousing
    );
  }

  const paginate = (page) => {
    setCurrentPage(page);
  };
  return (
    <main className={'container'}>
      <div className="content">
        {likedHousing && (
          <>
            <HousingContainer
              loading={isLoading}
              housings={currentHousing}
              likeOrCross={true}
              likedHousing={onlyIds}
            />
            <Pagination
              itemsPerPage={housingsPerPage}
              totalItems={likedHousing.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default LikedHousing;
