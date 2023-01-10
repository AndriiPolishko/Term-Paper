import React from 'react';
import Housing from './Housing';
function HousingContainer({ loading, housings, showHeart }) {
  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="housingsContainer">
      {housings.map((housing) => (
        <Housing housing={housing} key={housing.id} showHeart={showHeart} />
      ))}
    </div>
  );
}

export default HousingContainer;
