import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import { always } from 'ramda'

import { changeSearch, searchStarted, searchResultReceived } from '../actions'

const currentSearch = handleAction(
  changeSearch,
  (state, action) => action.payload,
  ''
)

const searchResult = handleAction(
  searchResultReceived,
  (state, action) => [action.payload.data.codepoint],
  []
)
const status = handleActions({
  [searchStarted]: always('FETCHING'),
  [searchResultReceived]: always('IDLE')
}, 'IDLE')

export default combineReducers({ currentSearch, searchResult, status })
