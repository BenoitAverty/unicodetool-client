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
    const Time = mockTimeSource()
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

    it('Sends the nameSearchStarted action', done => {
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
  })
})
