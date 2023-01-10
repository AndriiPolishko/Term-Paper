import React from 'react';
import Housing from './Housing';
function HousingContainer({ loading, housings, showHeart, likedHousing }) {
  if (loading) {
    return <h3>Loading...</h3>;
  }
  const safeLikedHousing = likedHousing === undefined ? [] : likedHousing;

  return (
    <div className="housingsContainer">
      {housings.map((housing) => (
        <Housing
          housing={housing}
          key={housing.id}
          showHeart={showHeart}
          isLikedAlready={safeLikedHousing.includes(housing.id)}
        />
      ))}
    </div>
  );
}

export default HousingContainer;
