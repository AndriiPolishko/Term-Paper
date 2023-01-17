import React from 'react';
import Housing from './Housing';
function HousingContainer({
  loading,
  housings,
  likedHousing,
  likeOrCross,
  passChildParam,
}) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  const safeLikedHousing = likedHousing === undefined ? [] : likedHousing;
  const safeHousings = housings === undefined ? [] : housings;

  return (
    <div className="housingsContainer">
      {safeHousings.map((housing) => (
        <Housing
          housing={housing}
          key={housing.id}
          isLikedAlready={safeLikedHousing.includes(housing.id)}
          likeOrCross={likeOrCross}
          passChildParam={passChildParam}
        />
      ))}
    </div>
  );
}

export default HousingContainer;
