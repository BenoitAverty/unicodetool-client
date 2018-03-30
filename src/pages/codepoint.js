import React from 'react'
import withRedux from 'next-redux-wrapper'

import makeStore from '../redux/store'
import { fetchCodepointDetails } from '../redux/actions'
import Layout from '../components/Layout'
import CodepointSummary from '../components/CodepointSummary'
import { codepointById } from '../redux/reducer'

class CodepointPage extends React.Component {
  static async getInitialProps({ store, query }) {
    store.dispatch(fetchCodepointDetails(query.cp))
  }

  render() {
    return (
      <Layout>
        {this.props.codepoint ? (
          <CodepointSummary codepoint={this.props.codepoint} />
        ) : (
          <p>Loading...</p>
        )}
      </Layout>
    )
  }
}

export const withoutRedux = CodepointPage

const mapStateToProps = (state, { url }) => ({
  codepoint: codepointById(state, url.query.cp),
})

export default withRedux(makeStore, mapStateToProps)(CodepointPage)
