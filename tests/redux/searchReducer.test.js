/* eslint-env jest */
import { changeSearch, codepointLookupStarted, searchResultReceived } from '../../src/redux/actions'

// Reducer under test
import search, {
  getCurrentSearch,
  getSearchResult,
  getSearchStatus,
} from '../../src/redux/reducer/searchReducer'

describe('Search Reducer', () => {
  describe('Initial state', () => {
    it('Has an empty currentSearch attribute', () => {
      const initialState = search(undefined, { type: '@@INIT' })

      expect(initialState).toBeDefined()
      expect(getCurrentSearch(initialState)).toBe('')
    })

    it('Has an empty searchResult attribute', () => {
      const initialState = search(undefined, { type: '@@INIT' })

      expect(initialState).toBeDefined()
      expect(getSearchResult(initialState)).toEqual([])
    })

    it('Has the IDLE status', () => {
      const initialState = search(undefined, { type: '@@INIT' })

      expect(initialState).toBeDefined()
      expect(getSearchStatus(initialState)).toBe('IDLE')
    })
  })

  it('Updates currentSearch after a changeSearch action', () => {
    const action = changeSearch('New value')
    const actual = search({ currentSearch: '' }, action)

    expect(getCurrentSearch(actual)).toBe('New value')
  })

  it('Has the FETCHING status after the codepointLookupStarted action', () => {
    const action = codepointLookupStarted()
    const actual = search({ status: 'IDLE' }, action)

    expect(getSearchStatus(actual)).toBe('FETCHING')
  })

  it('Has the SUCCESS status after the searchResultReceived action', () => {
    const action = searchResultReceived({ data: { codepoint: {} } })
    const actual = search({ status: 'FETCHING' }, action)

    expect(getSearchStatus(actual)).toBe('SUCCESS')
  })

  it('Has the received codepoints in its searchResult attribute after a searchResultReceived action', () => {
    const action = searchResultReceived({
      data: { codepoint: { value: '0041' } },
    })
    const actual = search({ searchResult: [] }, action)

    expect(getSearchResult(actual)).toEqual([{ value: '0041' }])
  })

  it('Clears the searchResult attribute when receiving a null codepoint', () => {
    const action = searchResultReceived({
      data: { codepoint: null },
    })
    const actual = search({ searchResult: [{ value: '0041' }] }, action)

    expect(getSearchResult(actual)).toEqual([])
  })
})
