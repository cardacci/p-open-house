const RETRY_ATTEMPTS = 2;

/**
 * Fetches data from a URL with retry logic.
 */
const fetchWithRetry = async (url, attemptsLeft = RETRY_ATTEMPTS) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request to ${url} failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (attemptsLeft <= 0) {
      throw error;
    }
    return fetchWithRetry(url, attemptsLeft - 1);
  }
};

export const fetchSavedListings = () => fetchWithRetry('/api/saved-listings');

export const fetchListingDetail = (listingId) =>
  fetchWithRetry(`/api/saved-listings/${listingId}`);
