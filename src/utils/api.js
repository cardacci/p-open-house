import {HTTP_STATUS_INTERNAL_SERVER_ERROR} from '../constants/httpStatus';

const RETRY_ATTEMPTS = 2;

const isClientErrorStatus = (status) => status >= 400 && status <  HTTP_STATUS_INTERNAL_SERVER_ERROR;

/**
 * Fetches data from a URL with retry logic.
 */
const fetchWithRetry = async (url, attemptsLeft = RETRY_ATTEMPTS) => {
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    if (attemptsLeft <= 0) {
      throw error;
    }
    return fetchWithRetry(url, attemptsLeft - 1);
  }

  if (response.ok) {
    return response.json();
  }

  const error = new Error(`Request to ${url} failed with status ${response.status}`);
  error.status = response.status;

  // 4xx means the request itself is the problem (not found, unauthorized, etc.), retrying the same request won't change that.
  if (isClientErrorStatus(error.status) || attemptsLeft <= 0) {
    throw error;
  }

  return fetchWithRetry(url, attemptsLeft - 1);
};

export const fetchSavedListings = () => fetchWithRetry('/api/saved-listings');

export const fetchListingDetail = (listingId) =>
  fetchWithRetry(`/api/saved-listings/${listingId}`);
