import React from 'react'
import fetch from 'isomorphic-fetch'

import { codepointLookupQuery } from '../redux/cycles/graphqlRequests'
import Layout from '../components/Layout'
import CodepointSummary from '../components/CodepointSummary'

class CodepointPage extends React.Component {
  static async getInitialProps({ query }) {
    console.log(`fetching codepoint ${query.cp}`)
    return (
      fetch('https://unicodetool-api.now.sh/graphql', {
        method: 'POST',
        body: JSON.stringify({
          query: codepointLookupQuery,
          variables: {
            value: query.cp,
          },
        }),
      })
        .then(response => response.json())
        // .then(a => (console.log(a), a))
        .then(body => ({
          codepoint: body.data.codepoint,
        }))
    )
  }

  render() {
    return (
      <Layout>
        <h1>{this.props.codepoint.name}</h1>
        <CodepointSummary codepoint={this.props.codepoint} />
      </Layout>
    )
  }
}

// export default withRedux(makeStore)(CodepointPage)
export default CodepointPage
