/* eslint-env jest */

import codepointsReducer from '../../src/redux/reducer/codepointsReducer'

describe('Codepoints Reducer', () => {
  describe('Initial State', () => {
    it('Is an empty object', () => {
      const initialState = codepointsReducer(undefined, { type: '@@INIT' })

      expect(initialState).toEqual({})
    })
  })
})
