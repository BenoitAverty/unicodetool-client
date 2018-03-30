import { createAction } from 'redux-actions'

export const changeSearch = createAction('CHANGE_SEARCH')
export const codepointLookupStarted = createAction('CODEPOINT_LOOKUP_STARTED')
export const nameSearchStarted = createAction('NAME_SEARCH_STARTED')
export const searchResultReceived = createAction('SEARCH_RESULT_RECEIVED')

export const fetchCodepointDetails = createAction('FETCH_CODEPOINT_DETAILS')
export const codepointLookupFailure = createAction('CODEPOINT_LOOKUP_FAILURE')
export const codepointLookupSuccess = createAction('CODEPOINT_LOOKUP_SUCCESS')
