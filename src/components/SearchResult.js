import { always, propEq, ifElse } from 'ramda'

// SearchResult is always null before any search has happened
const idleSearchResult = always(null)

// When a search has happened but there is no result, symply display a message.
const emptySearchResult = always(
  <p class='searchResult emptySearchResult'>
    Your search didn't get any result.
  </p>
)

// When there are results, they must be passed as children of the compoenent.
const nonEmptySearchResult = ({ children }) => (
  <div className='searchResult'>
    {children}
  </div>
)

// This is the component itself
const SearchResult = ifElse(
  propEq('status', 'IDLE'),
  idleSearchResult,
  ifElse(propEq('children', []), emptySearchResult, nonEmptySearchResult)
)
SearchResult.displayName = 'SearchResult'

export default SearchResult
