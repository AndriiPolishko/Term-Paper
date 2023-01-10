import React from 'react';

function PriceFilter({ passChildData }) {
  return (
    <div>
      <input
        type="number"
        onChange={(e) => {
          if (!e.target.value) {
            passChildData(undefined);
          } else {
            passChildData(e.target.value);
          }
        }}
      />
    </div>
  );
}

export default PriceFilter;
