import { handleAction } from 'redux-actions'
import { prop, mergeDeepRight, flip } from 'ramda'

import { codepointLookupSuccess } from '../actions'

// Update a codepoint with new values
const updateCodepoint = mergeDeepRight

// Reducers
const data = handleAction(
  codepointLookupSuccess,
  (state, action) => {
    const key = action.payload.value
    return {
      ...state,
      [key]: updateCodepoint(state[key], action.payload),
    }
  },
  {},
)

export default data

// Selectors
export const byId = flip(prop)
