import React from 'react';
import { useState } from 'react';

function PriceFilter({ passChildData }) {
  const [price, setPrice] = useState(0);
  return (
    <div>
      <input
        type="number"
        onChange={(e) => {
          setPrice(e.target.value);
          passChildData(price);
        }}
        onMouseLeave={(e) => {
          setPrice(e.target.value);
          passChildData(price);
        }}
        onMouseOver={(e) => {
          setPrice(e.target.value);
          passChildData(price);
        }}
      />
    </div>
  );
}

export default PriceFilter;
