import { always, propEq, ifElse, isNil, map } from 'ramda'

// Add a div around each children so they are stylable for flexbox
const addFlexChildContainer = element => (
  <div key={element.key}>
    {element}
    <style jsx>{`
      div {
        padding: 5px;
        flex: 1 1 auto;
      }
    `}</style>
  </div>
)

// When there are results, they must be passed as children of the compoenent.
const nonEmptySearchResult = ({ children }) => (
  <div className='searchResult'>
    {React.Children.map(children, addFlexChildContainer)}
    <style jsx>{`
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;
      }
    `}</style>
  </div>
)

// SearchResult is always null before any search has happened
const idleSearchResult = always(null)

// When a search has happened but there is no result, symply display a message.
const emptySearchResult = always(
  <p className='searchResult emptySearchResult'>
    Your search didn't get any result.
    <style jsx>{`
      p {
        text-align: center;
        font-size: 1.1rem;
      }
    `}</style>
  </p>
)

// This is the component itself
const SearchResult = ifElse(
  propEq('status', 'IDLE'),
  idleSearchResult,
  ifElse(propEq('children', []), emptySearchResult, nonEmptySearchResult)
)
SearchResult.displayName = 'SearchResult'

export default SearchResult
