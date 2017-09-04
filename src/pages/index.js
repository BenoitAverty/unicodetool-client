import withRedux from 'next-redux-wrapper'
import { Jumbotron } from 'reactstrap'
import Link from 'next/link'
import { pipe, defaultTo, map } from 'ramda'
import Spinner from 'react-md-spinner'

import makeStore from '../redux/store'
import { changeSearch } from '../redux/actions'
import {
  getCurrentSearch,
  getSearchResult,
  getSearchStatus
} from '../redux/reducer'

import Layout from '../components/Layout'
import UnicodeSearchField from '../components/UnicodeSearchField'
import SearchResult from '../components/SearchResult'
import CodepointSummary from '../components/CodepointSummary'

const spinner = (
  <div>
    <Spinner />
    <style jsx>{`
      div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
)
const buildCodepointSummaries = pipe(
  defaultTo([]),
  map(codepoint => (
    <CodepointSummary codepoint={codepoint} key={codepoint.value} />
  ))
)
const Index = props => (
  <Layout>
    <Jumbotron>
      <UnicodeSearchField
        value={props.currentSearch}
        onChange={props.handleSearchChange}
      />
      <p className='examples'>
        Examples: "
        <a
          className='suggestionLink'
          href='#'
          onClick={e => props.handleSearchChange('U+0041')}
        >
          U+0041
        </a>
        ", "
        <a
          className='suggestionLink'
          href='#'
          onClick={e => props.handleSearchChange('HEART')}
        >
          HEART
        </a>
        ", "
        <a
          className='suggestionLink'
          href='#'
          onClick={e => props.handleSearchChange('à')}
        >
          à
        </a>
        ".{' '}
        <Link href='/help'>
          <a>More help and examples...</a>
        </Link>
      </p>
    </Jumbotron>
    {props.searchStatus === 'FETCHING' ? (
      spinner
    ) : (
      <SearchResult status={props.searchStatus}>
        {buildCodepointSummaries(props.searchResult)}
      </SearchResult>
    )}
    <style jsx>{`
      p {
        text-align: center;
      }
    `}</style>
  </Layout>
)

// Export the base compoenent for tests
export const withoutRedux = Index

// Connect to the store
const mapStateToProps = state => ({
  currentSearch: getCurrentSearch(state),
  searchResult: getSearchResult(state),
  searchStatus: getSearchStatus(state)
})
const mapDispatchToProps = dispatch => ({
  handleSearchChange: s => dispatch(changeSearch(s))
})
export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Index)
