import { mockTimeSource } from '@cycle/time/rxjs'

import search from '../../src/redux/cycles/searchCycles'
import { changeSearch } from '../../src/redux/actions'

// Test suite
describe('Search Cycles', () => {
  it("doesn't emit any actions/requests when the search is cleared", done => {
    const Time = mockTimeSource()
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('')
    })

    const { Action: actionSink, Http: httpSink } = search({
      Action: actionSource
    })

    Time.assertEqual(actionSink, Time.diagram('-'))
    Time.assertEqual(httpSink, Time.diagram('-'))
    Time.run(done)
  })

  it('Emits a search by codepoint when a codepoint is typed in', done => {
    const Time = mockTimeSource()
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('U+0041')
    })
    const { Http: httpSink } = search({ Action: actionSource })

    Time.assertEqual(
      httpSink,
      Time.diagram('--a--', {
        a: {
          url: 'http://localhost:8080/graphql',
          category: 'codepoint-search',
          method: 'POST',
          send: {
            query: `query findCodepoint($value: CodepointValue!) {
          codepoint(value: $value) {
            value
            name
            properties {
              block
              generalCategory
            }
          }
        }`,
            variables: `{
          "value": "U+0041"
        }`
          }
        }
      })
    )
    Time.run(done)
  })
})
