import { Observable } from 'rxjs'
import { prop, propEq, test, compose, not, ifElse, isNil, F, pipe, trim, isEmpty } from 'ramda'

import { changeSearch, nameSearchStarted, searchResultReceived } from '../actions'
import { nameSearchRequest, nameSearchRequestCategory } from './graphqlRequests'

// Return true if a string is neither undefined nor empty
const isNotBlank = ifElse(isNil, F, pipe(trim, isEmpty, not))

// Return true if a string is not a prefixed unicode codepoint value
const isNotPrefixedCodepointValue = compose(not, test(/^U\+[0-9A-Fa-f]{4,6}/))

export default function({ Action, Time, Http }) {

  const nameSearch$ = Action
    .filter(propEq('type', changeSearch.toString()))
    .map(prop('payload'))
    .let(Time.debounce(250))
    .distinctUntilChanged()
    .filter(isNotPrefixedCodepointValue)
    .filter(isNotBlank)
    .map(nameSearchRequest)

  const searchStartedAction$ = nameSearch$.mapTo(nameSearchStarted())

  const searchResult$ = Http.select(nameSearchRequestCategory)
    .switch()
    .map(prop('body'))
    .map(searchResultReceived)

  return {
    Action: Observable.merge(searchStartedAction$, searchResult$),
    Http: nameSearch$
  }
}
