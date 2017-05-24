import { Observable } from 'rxjs'
import { mockTimeSource } from '@cycle/time/rxjs'

import nameSearch from '../../src/redux/cycles/nameSearchCycles'
import { nameSearchQuery } from '../../src/redux/cycles/graphqlRequests'
import {
  changeSearch,
  nameSearchStarted,
  searchResultReceived
} from '../../src/redux/actions'

import { mockHttpSource } from './utils'

describe('Search By Name Cycles', () => {
  it("doesn't emit any actions/requests when the search is cleared", done => {
    const Time = mockTimeSource({interval: 125})
    const actionSource = Time.diagram('--a--', {
      a: changeSearch('')
    })

    const { Action: actionSink, Http: httpSink } = nameSearch({
      Action: actionSource,
      Http: mockHttpSource(Observable.never()),
      Time
    })

    Time.assertEqual(actionSink, Time.diagram('-'))
    Time.assertEqual(httpSink, Time.diagram('-'))
    Time.run(done)
  })

  describe('When a search is typed in', () => {
    it('Emits a codepoint search query when a random string is typed in', done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a--', {
        a: changeSearch('GHOST')
      })
      const { Http: httpSink } = nameSearch({
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
      Time.run(done)
    })

    it('Sends the nameSearchStarted action when a random string is typed in', done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a--', {
        a: changeSearch('GHOST')
      })
      const { Action: actionSink } = nameSearch({
        Action: actionSource,
        Http: mockHttpSource(Observable.never()),
        Time
      })

      Time.assertEqual(
        actionSink,
        Time.diagram('----a--', {
          a: nameSearchStarted()
        })
      )
      Time.run(done)
    })

    it("Doesn't send a query/action if the search is a prefixed codepoint value", done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a--', {
        a: changeSearch('U+0041')
      })
      const { Http: httpSink, Action: actionSink } = nameSearch({
        Action: actionSource,
        Http: mockHttpSource(Observable.never()),
        Time
      })

      Time.assertEqual(httpSink, Time.diagram('-'))
      Time.assertEqual(actionSink, Time.diagram('-'))
      Time.run(done)
    })

    it("Doesn't send the same query twice", done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a---bc--', {
        a: changeSearch('GHOST'),
        b: changeSearch('GHOSTS'),
        c: changeSearch('GHOST')
      })
      const { Http: httpSink } = nameSearch({
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

    it("Sends the same query twice if there was another, unhandled, search in the meantime.", done => {
      const Time = mockTimeSource({ interval: 125 })
      const actionSource = Time.diagram('--a--b--a--', {
        a: changeSearch('GHOST'),
        b: changeSearch('U+10411')
      })
      const { Http: httpSink } = nameSearch({
        Action: actionSource,
        Http: mockHttpSource(Observable.never()),
        Time
      })

      Time.assertEqual(
        httpSink,
        Time.diagram('----a-----a--', {
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
  })

  describe('When a request answer arrives', () => {
    it('sends the searchResultReceived action', done => {
      const Time = mockTimeSource({ interval: 125 })

      //fake data from the server
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
          body: fakeReceivedData
        }
      })
      const httpSource = mockHttpSource(httpResponse$)
      const { Action: actionSink } = nameSearch({
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
