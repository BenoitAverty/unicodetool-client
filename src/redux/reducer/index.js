import { pipe, prop } from 'ramda'
import { combineReducers } from 'redux'

import search, {
  getCurrentSearch as _getCurrentSearch,
  getSearchResult as _getSearchResult,
  getSearchStatus as _getSearchStatus,
} from './searchReducer'

import codepoints, { byId as _byId } from './codepointsReducer'

// Root reducer
export default combineReducers({ search, codepoints })

// Higher-order selectors. These are the selectors that should be used in the 'mapStateToProps'
// functions because they are the most stable in terms of interface, and they take the entire
// state tree as argument.
export const getCurrentSearch = pipe(prop('search'), _getCurrentSearch)
export const getSearchResult = pipe(prop('search'), _getSearchResult)
export const getSearchStatus = pipe(prop('search'), _getSearchStatus)
export const codepointById = (state, id) => _byId(state.codepoints, id)
