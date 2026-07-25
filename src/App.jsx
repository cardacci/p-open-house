import React, {useState, useEffect, useCallback} from 'react';
import Calendar from './components/Calendar';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';
import {fetchSavedListings, fetchListingDetail} from './utils/api';

const App = () => {
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadListing = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const savedListings = await fetchSavedListings();
      const favoritedListing = savedListings.find((item) => item.isFavorited);

      if (!favoritedListing) {
        setError('No favorited listings found.');
        return;
      }

      const listingDetail = await fetchListingDetail(favoritedListing.id);
      setListing(listingDetail);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadListing();
  }, [loadListing]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadListing} />;
  }

  return (
    <div className="calendar-container">
      <Calendar availableTourDays={listing.openHouses ?? []} />
    </div>
  );
};

export default App;
