import { Observable } from 'rxjs'
import { TestScheduler } from 'rxjs/testing/TestScheduler'

import search from '../../src/redux/cycles/searchCycles'
import { changeSearch } from '../../src/redux/actions'

// setup rxjs TestScheduler
const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected)
})

const createColdObservable = testScheduler.createColdObservable.bind(
  testScheduler
)
const expectObservable = testScheduler.expectObservable.bind(testScheduler)

// Flush the scheduler after each test method
afterEach(() => {
  testScheduler.flush()
})

describe('Search Cycles', () => {
  it("doesn't emit any actions when the search is cleared", () => {
    const actionSources = createColdObservable('--a--|', {
      a: changeSearch('')
    })
    const { action: actionSinks } = search({ action: actionSources })
    expectObservable(actionSinks).toBe('-')
  })
})
