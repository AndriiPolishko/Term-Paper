import React from 'react';
import Realtor from './Realtor';

function RealtorContainer({ loading, realtors }) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  const safeRealtors = realtors === undefined ? [] : realtors;

  return (
    <div className="housingsContainer">
      {safeRealtors.map((realtor) => (
        <Realtor realtor={realtor} key={realtor.id} />
      ))}
    </div>
  );
}

export default RealtorContainer;
