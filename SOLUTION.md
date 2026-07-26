## Steps that I followed

### 0. Repository created

- Aiming for clear iteration on the project and its features, to help prevent big mistakes.
- Every commit was made using AI: I asked it to commit directly to the main branch and write the commit message itself.
- In a real production environment, there would be more branches, like a development one.

### 1. Fixing existing bugs

- Documented some functions for better understanding, for other engineers or even myself in the future.
- Avoided rendering non-existing days, instead, just rendered an empty day element.

### 2. Connecting to the API and removing the mock data

- Used AI to write the connection to the API. I asked it to use the native fetch function and capture errors with try/catch, then create an Error component to show the messages and retry if the endpoint fails, with 2 retries.
- Added a landing page (`ListingsPage`) that lists the saved listings and lets the user click one to see its calendar (`ListingCalendar`), with a back button to return to the list.
- `App` now only orchestrates which view is shown (`ListingsPage` or `ListingCalendar`), based on whether a listing is selected. Each view owns its own fetching, loading and error state. Calendar remains a pure presentational component that just receives the tour days as a prop.

### 3. Updating Tour Details
- The Tour Details modal looked bad, it was just dumping the raw tour data with `JSON.stringify`. Rebuilt it after a real compass.com listing page's own "Request a Tour" modal: a header with a title and a close (`x`) button separated by a divider, the date written out in full instead of `Date: ...`, and a full-width black pill button at the bottom.

### 4. Responsive design
- Used AI to review every view (listings, calendar, modal) and make them responsive for mobile: added the missing viewport meta tag, gave the modal a bounded width so it doesn't overflow small screens, and added a media query that shrinks spacing, font sizes and the listings grid down to a single column below 600px.

### 5. Testing

- The project has no test runner, and the instructions rule out adding packages or scripts, so I tested by hand in the browser: the listings page, the calendar, the modal, and the error and retry paths by forcing the API to fail.
- Fixed an off-by-one on every open house date. The API returns dates like "2026-07-04", and reading that string with `new Date()` treats it as midnight UTC, so anyone behind UTC saw the tour a day earlier than it really was. Every listing is in New York, so it affected the whole audience. Dates are now built from their year, month and day parts and stay on the right calendar day. Checked in New York, Buenos Aires and Auckland.
- Added the weekday initials above the grid. Without them there is no way to tell which column a day falls on.
- The blank cells before the first of the month were growing and changing colour on hover, as if they could be clicked. The hover is now limited to real days.
- Removed the `.tooltip` rule from the stylesheet, nothing in the app used it.

## Decisions

### Product
- If no listing is favorited, the landing page shows all saved listings instead of an error. Not finding a favorite isn't really an error, it's just an empty state, so treating it as one would be misleading to the user.
- The API only returns a two-hour tour window per day (e.g. "4PM-6PM"), but a real visit only takes 30 minutes, so the window gets split into 30-minute slots ("4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM") for the "Pick a time" select. The end of the window isn't offered as a slot since a tour starting exactly at closing time wouldn't make sense.

### Project Structure
- Static files live under `src/assets`, split into `fonts` and `images`, so there is one obvious place to look for them and room to grow by type instead of a single flat folder.
- HTTP status codes live in `src/constants/httpStatus.js` instead of being written inline where they are checked.

### React
- Used `useCallback` to wrap the fetch function (`loadListing`) so the same function reference is kept across re-renders. This lets `useEffect` depend on it safely without re-running on every render, and lets the same function be reused as the retry button's `onClick` handler without recreating it each time.

### API & Error Handling
- Any 4xx response (not just 404) skips the retry loop. A 4xx means the request itself is the problem (not found, unauthorized, etc.), not something transient on the server, so retrying the exact same request won't change the outcome. Only 5xx responses and network failures are retried. For `saved-listings/<id>` specifically, the UI tells the user the listing's information isn't available right now and offers a button to go back to the listings page instead of "Try again".

### CSS
- Renamed the `calendar-container` CSS class to `page-container`. It used to wrap only the calendar, but now it also wraps the listings page, so the old name no longer described what it holds. Naming things after what they actually contain matters for readability, especially as the app grows.
- Abstracted repeated values in `index.css` (colors, border-radius, shadows, spacing, transitions) into CSS custom properties under `:root`, instead of leaving the same literal values copy-pasted across rules. If the project used a tool or library (Sass, a CSS-in-JS solution, Tailwind's config, a design tokens package, etc.), these would probably live somewhere else (a theme file, a config object), but with plain CSS, `:root` custom properties are the natural way to do this.
- Used the real Compass Sans and Compass Serif from compass.com, self-hosted under `src/assets/fonts`. The typefaces belong to Compass and are included here only to make this exercise look right.
- Asked AI to scrape compass.com and pull the main design values (colors, button and card styles) straight from the real site instead of guessing, then bring those values into this app: black as the primary color instead of blue, pill-shaped buttons, and flat listing cards without rounded corners.

## AI
- Claude Code: Sonnet model. It's good for most tasks and consumes fewer tokens than Opus or Fable models.
- I always encourage creating skills for AI models: AGENTS.md for general-purpose guidance and SKILL.md for specific ones. I created a base one from my own experience and added it to this project. I like keeping files organized so developers can write code and get to the right section quickly.