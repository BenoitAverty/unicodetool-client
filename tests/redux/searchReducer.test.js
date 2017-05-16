import { changeSearch } from '../../src/redux/actions'

// Reducer under test
import search from '../../src/redux/reducer/searchReducer'

describe('Search Reducer', () => {
  describe('Initial state', () => {
    it('Has an empty currentSearch attribute', () => {
      const initialState = search(undefined, { type: '@@INIT' })

      expect(initialState).toBeDefined()
      expect(initialState.currentSearch).toBe('')
    })
  })

  it('Should update currentSearch after a changeSearch action', () => {
    const action = changeSearch('New value')
    const actual = search({ currentSearch: '' }, action)

    expect(actual.currentSearch).toBe('New value')
  })
})
