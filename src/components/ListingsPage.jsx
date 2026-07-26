import React, {useState, useEffect, useCallback} from 'react';
import ErrorMessage from './ErrorMessage';
import ListingCard from './ListingCard';
import Spinner from './Spinner';
import {fetchSavedListings} from '../utils/api';

const EmptyState = () => {
  return (
    <div className="empty-state">
      <svg
        className="empty-state-icon"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="empty-state-text">
        You haven't saved any listings yet. Once you favorite a listing, it
        will show up here.
      </p>
    </div>
  );
};

const ListingsPage = ({onSelectListing}) => {
  /* ===== State ===== */
  const [errorMessage, setErrorMessage] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== Callbacks ===== */
  const loadListings = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const savedListings = await fetchSavedListings();
      const favoritedListings = savedListings.filter((item) => item.isFavorited);
      const newListingsValue = favoritedListings.length > 0 ? favoritedListings : savedListings;
      setListings(newListingsValue);
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  /* ===== Effects ===== */
  useEffect(() => {
    loadListings();
  }, [loadListings]);

   /* ===== JSX Return ===== */
  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} onRetry={loadListings} />;
  }

  return (
    <div className="listings-page">
      <h1 className="listings-title">
        {listings.length > 0 ? 'Your Saved Listings' : 'No Saved Listings'}
      </h1>
      {listings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClick={() => onSelectListing(listing.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
