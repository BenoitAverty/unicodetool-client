import { createAction } from 'redux-actions'

export const changeSearch = createAction('CHANGE_SEARCH')
export const searchStarted = createAction('SEARCH_STARTED')
export const searchResultReceived = createAction('SEARCH_RESULT_RECEIVED')
