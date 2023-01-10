import React from 'react';

function PriceFilter({ passChildData }) {
  return (
    <div className="filterWrap">
      <label htmlFor="priceFilter" className="searchBarInputLabel"></label>
      <input
        type="number"
        id="priceFilter"
        className="searchBarInput"
        onChange={(e) => {
          if (!e.target.value) {
            passChildData(undefined);
          } else {
            passChildData(e.target.value);
          }
        }}
        placeholder={'Input the upper price boundary'}
      />
    </div>
  );
}

export default PriceFilter;
