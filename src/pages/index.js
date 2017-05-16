import withRedux from 'next-redux-wrapper'
import { Jumbotron } from 'reactstrap'
import Link from 'next/link'

import makeStore from '../redux/store'
import { changeSearch } from '../redux/actions'

import Layout from '../components/Layout'
import UnicodeSearchField from '../components/UnicodeSearchField'

const Index = props => (
  <Layout>
    <Jumbotron>
      <UnicodeSearchField
        value={props.currentSearch}
        onChange={props.handleSearchChange}
      />
      <p>
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
          onClick={e => props.handleSearchChange('GHOST')}
        >
          GHOST
        </a>
        ", "
        <a
          className='suggestionLink'
          href='#'
          onClick={e => props.handleSearchChange('à')}
        >
          à
        </a>
        ".
        {' '}
        <Link href='/help'><a>More help and examples...</a></Link>
      </p>
    </Jumbotron>
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
const mapStateToProps = state => ({ currentSearch: state.search.currentSearch })
const mapDispatchToProps = dispatch => ({
  handleSearchChange: s => dispatch(changeSearch(s))
})
export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Index)
