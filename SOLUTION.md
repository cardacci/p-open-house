## Steps that I followed

### 1. Fixing existing bugs

- Documented some functions for better understanding, for other engineers or even myself in the future.
- Avoid rendering non-existing days, instead, just render an empty day element.

### 2. Connecting to the API and removing the mock data

- The data fetching lives in the App component and is passed down to Calendar. Calendar remains a pure presentational component.
- Used AI (Claude Code) to write the connection to the API. I asked it to use the native fetch function and capture errors with try/catch, then create an Error component to show the messages and retry if the endpoint fails, with 2 retries.


### Technical decisitons
- Used `useCallback` to wrap the fetch function (`loadListing`) so the same function reference is kept across re-renders. This lets `useEffect` depend on it safely without re-running on every render, and lets the same function be reused as the retry button's `onClick` handler without recreating it each time.
