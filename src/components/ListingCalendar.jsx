import React, {useCallback, useEffect, useState} from 'react';
import Calendar from './Calendar';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import {HTTP_STATUS_NOT_FOUND} from '../constants/httpStatus';
import {fetchListingDetail} from '../utils/api';

const ListingCalendar = ({listingId, onBack}) => {
  /* ===== State ===== */
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== Callbacks ===== */
  const loadListing = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const listingDetail = await fetchListingDetail(listingId);
      setListing(listingDetail);
    } catch (err) {
      console.error(err);

      if (err.status === HTTP_STATUS_NOT_FOUND) {
        setError({
          message: "This listing's information isn't available right now.",
          notFound: true,
        });
      } else {
        setError({message: 'Something went wrong. Please try again.'});
      }
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  /* ===== Effects ===== */
  useEffect(() => {
    loadListing();
  }, [loadListing]);

  /* ===== JSX Return ===== */
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={error.notFound ? undefined : loadListing}
        onBack={error.notFound ? onBack : undefined}
      />
    );
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>
        &larr; Back to listings
      </button>
      <Calendar availableTourDays={listing.openHouses ?? []} />
    </>
  );
};

export default ListingCalendar;
