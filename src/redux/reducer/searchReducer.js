import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import { always, reject, isNil, prop } from 'ramda'

import { changeSearch, codepointLookupStarted, nameSearchStarted, searchResultReceived } from '../actions'

// Reducers

const currentSearch = handleAction(
  changeSearch,
  (state, action) => action.payload,
  ''
)

const searchResult = handleAction(
  searchResultReceived,
  (state, action) => reject(isNil, [
    action.payload.data.codepoint,
    ...(action.payload.data.codepointSearch || [])
  ]),
  []
)
const status = handleActions({
  [codepointLookupStarted]: always('FETCHING'),
  [nameSearchStarted]: always('FETCHING'),
  [searchResultReceived]: always('SUCCESS')
}, 'IDLE')

export default combineReducers({ currentSearch, searchResult, status })

// Selectors
export const getCurrentSearch = prop('currentSearch')
export const getSearchResult = prop('searchResult')
export const getSearchStatus = prop('status')
