import {
  changeSearch,
  searchStarted,
  searchResultReceived
} from '../../src/redux/actions'

// Reducer under test
import search from '../../src/redux/reducer/searchReducer'

describe('Search Reducer', () => {
  describe('Initial state', () => {
    it('Has an empty currentSearch attribute', () => {
      const initialState = search(undefined, { type: '@@INIT' })

      expect(initialState).toBeDefined()
      expect(initialState.currentSearch).toBe('')
    })

    it('Has an empty searchResult attribute', () => {
      const initialState = search(undefined, { type: '@@INIT' })

      expect(initialState).toBeDefined()
      expect(initialState.searchResult).toEqual([])
    })

    it('Has the IDLE status', () => {
      const initialState = search(undefined, { type: '@@INIT' })

      expect(initialState).toBeDefined()
      expect(initialState.status).toBe('IDLE')
    })
  })

  it('Updates currentSearch after a changeSearch action', () => {
    const action = changeSearch('New value')
    const actual = search({ currentSearch: '' }, action)

    expect(actual.currentSearch).toBe('New value')
  })

  it('Has the FETCHING status after the searchStarted action', () => {
    const action = searchStarted()
    const actual = search({ status: 'IDLE' }, action)

    expect(actual.status).toBe('FETCHING')
  })

  it('Has the IDLE status after the searchResultReceived action', () => {
    const action = searchResultReceived({ data: { codepoint: {} } })
    const actual = search({ status: 'FETCHING' }, action)

    expect(actual.status).toBe('IDLE')
  })

  it('Has the received codepoints in its searchResult attribute after a searchResultReceived action', () => {
    const action = searchResultReceived({
      data: { codepoint: { value: '0041' } }
    })
    const actual = search({ searchResult: [] }, action)

    expect(actual.searchResult).toEqual([{ value: '0041' }])
  })
})
