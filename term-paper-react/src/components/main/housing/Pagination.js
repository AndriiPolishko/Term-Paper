import React from 'react';

function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  updateLikedHousings,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagWrap">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => {
            paginate(page);
            if (updateLikedHousings) updateLikedHousings();
          }}
          className="pagBut button"
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
