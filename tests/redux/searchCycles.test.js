import { Observable } from 'rxjs'
import { mockTimeSource } from '@cycle/time/rxjs'

import search from '../../src/redux/cycles/searchCycles'
import {findCodepointQuery} from '../../src/redux/cycles/graphqlRequests'
import { changeSearch } from '../../src/redux/actions'

// Test suite
describe('Search Cycles', () => {
  it("doesn't emit any actions/requests when the search is cleared", done => {
    const Time = mockTimeSource()
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('')
    })

    const { Action: actionSink, Http: httpSink } = search({
      Action: actionSource,
      Http: Observable.never(),
      Time
    })

    Time.assertEqual(actionSink, Time.diagram('-'))
    Time.assertEqual(httpSink, Time.diagram('-'))
    Time.run(done)
  })

  it('Emits a search by codepoint when a codepoint is typed in', done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('U+0041')
    })
    const { Http: httpSink } = search({ Action: actionSource, Http: Observable.never(), Time })

    Time.assertEqual(
      httpSink,
      Time.diagram('----a--', {
        a: {
          url: 'http://localhost:8080/graphql',
          category: 'codepoint-search',
          method: 'POST',
          send: {
            query: findCodepointQuery,
            variables: JSON.stringify({
              "value": "U+0041"
            })
          }
        }
      })
    )
    Time.run(done)
  })

  it('Waits for the user to finish typing before sending the request', done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--abcdef--', {
      a: changeSearch('U'),
      b: changeSearch('U+'),
      c: changeSearch('U+0'),
      d: changeSearch('U+00'),
      e: changeSearch('U+004'),
      f: changeSearch('U+0042')
    })
    const { Http: httpSink } = search({ Action: actionSource, Time })

    Time.assertEqual(
      httpSink,
      Time.diagram('---------a--', {
        a: {
          url: 'http://localhost:8080/graphql',
          category: 'codepoint-search',
          method: 'POST',
          send: {
            query: findCodepointQuery,
            variables: JSON.stringify({
              value: 'U+0042'
            })
          }
        }
      })
    )
    Time.run(done)
  })

  it('Doesn\'t send the same query twice', done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--a---bc--', {
      a: changeSearch('U+0041'),
      b: changeSearch('U+004'),
      c: changeSearch('U+0041')
    })
    const { Http: httpSink } = search({ Action: actionSource, Time })

    Time.assertEqual(
      httpSink,
      Time.diagram('----a------', {
        a: {
          url: 'http://localhost:8080/graphql',
          category: 'codepoint-search',
          method: 'POST',
          send: {
            query: findCodepointQuery,
            variables: JSON.stringify({
              value: 'U+0041'
            })
          }
        }
      })
    )
    Time.run(done)
  })
})
