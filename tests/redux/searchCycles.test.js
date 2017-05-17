import { Observable } from 'rxjs'
import { TestScheduler } from 'rxjs/testing/TestScheduler'

import search from '../../src/redux/cycles/searchCycles'
import { changeSearch } from '../../src/redux/actions'

// setup rxjs TestScheduler
let testScheduler, createHotObservable, createColdObservable, expectObservable
beforeEach(() => {
  testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

  createHotObservable = testScheduler.createHotObservable.bind(testScheduler)
  createColdObservable = testScheduler.createColdObservable.bind(testScheduler)
  expectObservable = testScheduler.expectObservable.bind(testScheduler)
})

// Flush the scheduler after each test method
afterEach(() => {
  testScheduler.flush()
})

// Test suite
describe('Search Cycles', () => {
  it("doesn't emit any actions/requests when the search is cleared", () => {
    const actionSource = createHotObservable('--a--', {
      a: changeSearch('')
    })
    const { action: actionSink, http: httpSink } = search({
      action: actionSource
    })
    expectObservable(actionSink).toBe('-')
    expectObservable(httpSink).toBe('-')
  })

  it('Emits a search by codepoint when a codepoint is typed in', () => {
    const actionSource = createHotObservable('--a--', {
      a: changeSearch('U+0041')
    })
    const { http: httpSink } = search({ action: actionSource })
    expectObservable(httpSink).toBe('--a--', {
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
  })
})
