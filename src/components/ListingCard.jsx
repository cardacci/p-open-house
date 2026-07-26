import React from 'react';

const ListingCard = ({listing, onClick}) => {
  const { address, city, state, zipCode, price } = listing;

  /* ===== JSX Return ===== */
  return (
    <div className="listing-card" onClick={onClick}>
      <div className="listing-card-address">{address}</div>
      <div className="listing-card-location">
        {city}, {state} {zipCode}
      </div>
      <div className="listing-card-price">${price.toLocaleString()}</div>
    </div>
  );
};

export default ListingCard;
