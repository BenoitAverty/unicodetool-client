import { handleAction } from 'redux-actions'

import { changeSearch } from '../actions'

const search = handleAction(
  changeSearch,
  (state, action) => ({ currentSearch: action.payload }),
  { currentSearch: "" }
)

export default search
