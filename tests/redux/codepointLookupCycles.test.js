import { Observable } from 'rxjs'
import { mockTimeSource } from '@cycle/time/rxjs'

import codepointLookup from '../../src/redux/cycles/codepointLookupCycles'
import { codepointLookupQuery } from '../../src/redux/cycles/graphqlRequests'
import {
  changeSearch,
  codepointLookupStarted,
  searchResultReceived
} from '../../src/redux/actions'

import { mockHttpSource } from './utils'

// Test suite
describe('Codepoint Lookup Cycles', () => {
  it("doesn't emit any actions/requests when the search is cleared", done => {
    const Time = mockTimeSource()
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('')
    })

    const { Action: actionSink, Http: httpSink } = codepointLookup({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(actionSink, Time.diagram('-'))
    Time.assertEqual(httpSink, Time.diagram('-'))
    Time.run(done)
  })

  it('Emits a codepoint lookup request when a codepoint is typed in', done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('U+0041')
    })
    const { Http: httpSink } = codepointLookup({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(
      httpSink,
      Time.diagram('----a--', {
        a: {
          url: 'https://unicodetool-api.now.sh/graphql',
          category: 'codepoint-lookup',
          method: 'POST',
          send: {
            query: codepointLookupQuery,
            variables: JSON.stringify({
              value: 'U+0041'
            })
          }
        }
      })
    )
    Time.run(done)
  })

  it('Waits for the user to finish typing before sending the request', done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--abcdefg--', {
      a: changeSearch('U'),
      b: changeSearch('U+'),
      c: changeSearch('U+1'),
      d: changeSearch('U+10'),
      e: changeSearch('U+104'),
      f: changeSearch('U+1042'),
      g: changeSearch('U+10422')
    })
    const { Http: httpSink } = codepointLookup({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(
      httpSink,
      Time.diagram('----------a--', {
        a: {
          url: 'https://unicodetool-api.now.sh/graphql',
          category: 'codepoint-lookup',
          method: 'POST',
          send: {
            query: codepointLookupQuery,
            variables: JSON.stringify({
              value: 'U+10422'
            })
          }
        }
      })
    )
    Time.run(done)
  })

  it("Doesn't send the same query twice", done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--a---bc--', {
      a: changeSearch('U+10411'),
      b: changeSearch('U+1041'),
      c: changeSearch('U+10411')
    })
    const { Http: httpSink } = codepointLookup({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(
      httpSink,
      Time.diagram('----a------', {
        a: {
          url: 'https://unicodetool-api.now.sh/graphql',
          category: 'codepoint-lookup',
          method: 'POST',
          send: {
            query: codepointLookupQuery,
            variables: JSON.stringify({
              value: 'U+10411'
            })
          }
        }
      })
    )
    Time.run(done)
  })

  it("Doesn't send a codepoint lookup when the search doesn't have the right format", done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('PLOUF')
    })
    const { Http: httpSink } = codepointLookup({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(httpSink, Time.diagram('-----'))
    Time.run(done)
  })

  it('sends the codepointLookupStarted action when the search is changed', done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('U+0041')
    })
    const { Action: actionSink } = codepointLookup({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(
      actionSink,
      Time.diagram('----a--', {
        a: codepointLookupStarted()
      })
    )
    Time.run(done)
  })

  it('sends the searchResultReceived action when a response arrives', done => {
    const Time = mockTimeSource({ interval: 125 })

    //fake data from the server
    const fakeReceivedData = {
      data: {
        codepoint: {
          value: 'U+0041',
          name: 'LATIN CAPITAL LETTER A',
          properties: { block: 'ASCII', generalCategory: 'Lu' }
        }
      }
    }

    // Response stream
    const httpResponse$ = Time.diagram('-------a--', {
      a: {
        status: 200,
        body: fakeReceivedData
      }
    })
    const httpSource = mockHttpSource(httpResponse$)
    const { Action: actionSink } = codepointLookup({
      Action: Observable.never(),
      Http: httpSource,
      Time
    })

    Time.assertEqual(
      actionSink,
      Time.diagram('-------a--', {
        a: searchResultReceived(fakeReceivedData)
      })
    )
    Time.run(done)
  })
})
