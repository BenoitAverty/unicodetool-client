import { Observable } from 'rxjs'
import { mockTimeSource } from '@cycle/time/lib/rxjs'

import searchCycles from '../../src/redux/cycles/searchCycles'
import {
  nameSearchQuery,
  codepointLookupQuery,
  lookupAndSearchQuery,
  nameSearchRequestCategory,
  codepointLookupRequestCategory,
  lookupAndSearchRequestCategory
} from '../../src/redux/cycles/graphqlRequests'
import {
  changeSearch,
  nameSearchStarted,
  codepointLookupStarted,
  searchResultReceived
} from '../../src/redux/actions'

import { mockHttpSource } from './utils'

describe('Search cycles', () => {
  it("doesn't emit any actions/requests when the search is cleared", done => {
    const Time = mockTimeSource({ interval: 125 })
    const actionSource = Time.diagram('-a--b-', {
      a: changeSearch('test'),
      b: changeSearch('')
    })

    const { Action: actionSink, Http: httpSink } = searchCycles({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(
      httpSink,
      Time.diagram('---a----', {
        a: {
          url: 'https://unicodetool-api.now.sh/graphql',
          category: 'name-search',
          method: 'POST',
          send: {
            query: nameSearchQuery,
            variables: JSON.stringify({
              name: 'test'
            })
          }
        }
      })
    )
    Time.assertEqual(
      actionSink,
      Time.diagram('---a----', {
        a: nameSearchStarted()
      })
    )
    Time.run(done)
  })

  describe('When a search is typed in', () => {
    it('Emits a codepoint search query when a random string is typed in', done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a--', {
        a: changeSearch('GHOST')
      })
      const { Http: httpSink, Action: actionSink } = searchCycles({
        Action: actionSource,
        Http: mockHttpSource(Observable.never()),
        Time
      })

      Time.assertEqual(
        httpSink,
        Time.diagram('----a--', {
          a: {
            url: 'https://unicodetool-api.now.sh/graphql',
            category: 'name-search',
            method: 'POST',
            send: {
              query: nameSearchQuery,
              variables: JSON.stringify({
                name: 'GHOST'
              })
            }
          }
        })
      )
      Time.assertEqual(
        actionSink,
        Time.diagram('----a--', {
          a: nameSearchStarted()
        })
      )
      Time.run(done)
    })

    it('Emits a codepoint lookup request when a prefixed codepoint is typed in', done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a--', {
        a: changeSearch('U+0041')
      })
      const { Http: httpSink, Action: actionSink } = searchCycles({
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
      Time.assertEqual(
        actionSink,
        Time.diagram('----a--', {
          a: codepointLookupStarted()
        })
      )
      Time.run(done)
    })

    it('Emits both requests when a codepoint without prefix is typed in', done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a--', {
        a: changeSearch('0041')
      })
      const { Http: httpSink, Action: actionSink } = searchCycles({
        Action: actionSource,
        Http: mockHttpSource(Observable.never()),
        Time
      })

      Time.assertEqual(
        httpSink,
        Time.diagram('----a--', {
          a: {
            url: 'https://unicodetool-api.now.sh/graphql',
            category: 'codepoint-lookup+name-search',
            method: 'POST',
            send: {
              query: lookupAndSearchQuery,
              variables: JSON.stringify({
                name: '0041',
                value: '0041'
              })
            }
          }
        })
      )
      Time.assertEqual(
        actionSink,
        Time.diagram('----(ab)--', {
          a: nameSearchStarted(),
          b: codepointLookupStarted()
        })
      )
      Time.run(done)
    })

    it("Doesn't send the same query twice", done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a---bc--', {
        a: changeSearch('GHOST'),
        b: changeSearch('GHOSTS'),
        c: changeSearch('GHOST')
      })
      const { Http: httpSink } = searchCycles({
        Action: actionSource,
        Http: mockHttpSource(Observable.never()),
        Time
      })

      Time.assertEqual(
        httpSink,
        Time.diagram('----a------', {
          a: {
            url: 'https://unicodetool-api.now.sh/graphql',
            category: 'name-search',
            method: 'POST',
            send: {
              query: nameSearchQuery,
              variables: JSON.stringify({
                name: 'GHOST'
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
        a: changeSearch('1'),
        b: changeSearch('10'),
        c: changeSearch('101'),
        d: changeSearch('101A'),
        e: changeSearch('101AB'),
        f: changeSearch('101ABC')
      })
      const { Http: httpSink, Action: actionSink } = searchCycles({
        Action: actionSource,
        Http: mockHttpSource(Observable.never()),
        Time
      })

      Time.assertEqual(
        httpSink,
        Time.diagram('---------a--', {
          a: {
            url: 'https://unicodetool-api.now.sh/graphql',
            category: 'codepoint-lookup+name-search',
            method: 'POST',
            send: {
              query: lookupAndSearchQuery,
              variables: JSON.stringify({
                name: '101ABC',
                value: '101ABC'
              })
            }
          }
        })
      )
      Time.assertEqual(
        actionSink,
        Time.diagram('---------(ab)--', {
          a: nameSearchStarted(),
          b: codepointLookupStarted()
        })
      )
      Time.run(done)
    })
  })

  describe('When a response arrives', () => {
    it('sends the searchResultReceived action when a nameSearch response arrives', done => {
      const Time = mockTimeSource({ interval: 125 })

      // fake data from the server
      const fakeReceivedData = {
        data: {
          codepointSearch: [
            {
              value: 'U+00C5',
              decimalValue: 197,
              name: 'LATIN CAPITAL LETTER A WITH RING ABOVE',
              __typename: 'Character',
              character: 'Å'
            },
            {
              value: 'U+01FA',
              decimalValue: 506,
              name: 'LATIN CAPITAL LETTER A WITH RING ABOVE AND ACUTE',
              __typename: 'Character',
              character: 'Ǻ'
            }
          ]
        }
      }

      // Response stream
      const httpResponse$ = Time.diagram('-------a--', {
        a: {
          status: 200,
          request: { category: nameSearchRequestCategory },
          body: fakeReceivedData
        }
      })
      const httpSource = mockHttpSource(httpResponse$)
      const { Action: actionSink } = searchCycles({
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

    it('sends the searchResultReceived action when a codepointLookup response arrives', done => {
      const Time = mockTimeSource({ interval: 125 })

      // fake data from the server
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
          request: { category: codepointLookupRequestCategory },
          body: fakeReceivedData
        }
      })
      const httpSource = mockHttpSource(httpResponse$)
      const { Action: actionSink } = searchCycles({
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

    it('sends the searchResultReceived action when a lookupAndSearch response arrives', done => {
      const Time = mockTimeSource({ interval: 125 })

      // fake data from the server
      const fakeReceivedData = {
        data: {
          codepoint: {
            value: 'U+0041',
            name: 'LATIN CAPITAL LETTER A',
            properties: { block: 'ASCII', generalCategory: 'Lu' }
          },
          codepointSearch: []
        }
      }

      // Response stream
      const httpResponse$ = Time.diagram('-------a--', {
        a: {
          status: 200,
          request: { category: lookupAndSearchRequestCategory },
          body: fakeReceivedData
        }
      })
      const httpSource = mockHttpSource(httpResponse$)
      const { Action: actionSink } = searchCycles({
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
})
