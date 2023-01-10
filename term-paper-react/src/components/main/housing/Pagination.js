import React from 'react';

function Pagination({
  housingsPerPage,
  totalHousings,
  paginate,
  updateLikedHousings,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalHousings / housingsPerPage); i++) {
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
