import React, {useState} from 'react';
import ListingsPage from './components/ListingsPage';
import ListingCalendar from './components/ListingCalendar';

const App = () => {
  /* ===== State ===== */
  const [selectedListingId, setSelectedListingId] = useState(null);

  /* ===== JSX Return ===== */
  return (
    <div className="page-container">
      {selectedListingId ? (
        <ListingCalendar
          listingId={selectedListingId}
          onBack={() => setSelectedListingId(null)}
        />
      ) : (
        <ListingsPage onSelectListing={setSelectedListingId} />
      )}
    </div>
  );
};

export default App;
