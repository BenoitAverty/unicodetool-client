import React from 'react'
import fetch from 'isomorphic-fetch'
import withRedux from 'next-redux-wrapper'

import makeStore from '../redux/store'
import { codepointLookupSuccess } from '../redux/actions'
import { codepointLookupQuery } from '../redux/cycles/graphqlRequests'
import Layout from '../components/Layout'
import CodepointSummary from '../components/CodepointSummary'
import { codepointById } from '../redux/reducer'

class CodepointPage extends React.Component {
  static async getInitialProps({ store, query }) {
    return fetch('https://unicodetool-api.now.sh/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: codepointLookupQuery,
        variables: {
          value: query.cp,
        },
      }),
    })
      .then(response => response.json())
      .then(body => {
        store.dispatch(codepointLookupSuccess(body.data.codepoint))
        return {}
      })
  }

  render() {
    return (
      <Layout>
        <p>{this.props.testProp}</p>
        <CodepointSummary codepoint={this.props.codepoint} />
      </Layout>
    )
  }
}

export const withoutRedux = CodepointPage

const mapStateToProps = (state, { url }) => ({
  codepoint: codepointById(state, url.query.cp),
})

export default withRedux(makeStore, mapStateToProps)(CodepointPage)
