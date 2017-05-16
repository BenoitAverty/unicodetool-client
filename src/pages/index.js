import withRedux from 'next-redux-wrapper'
import { Jumbotron } from 'reactstrap'
import Link from 'next/link'

import makeStore from '../redux/store'

import Layout from '../components/Layout'
import UnicodeSearchField from '../components/UnicodeSearchField'

const Index = props => (
  <Layout>
    <Jumbotron>
      <UnicodeSearchField value={props.currentSearch} onChange={props.handleSearchChange} />
      <p>Examples: "<a href="#">U+0041</a>", "<a href="#">GHOST</a>", "<a href="#">à</a>". <Link href="/help"><a>More help and examples...</a></Link></p>
    </Jumbotron>
    <style jsx>{`
      p {
        text-align: center;
      }
    `}</style>
  </Layout>
)

export default withRedux(makeStore, state => state, dispatch => ({ handleSearchChange: (e) => {console.log(e)}}))(Index)
