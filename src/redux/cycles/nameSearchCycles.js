import { Observable } from 'rxjs'
import { prop, propEq, test, compose, not } from 'ramda'

import { changeSearch, nameSearchStarted, searchResultReceived } from '../actions'
import { nameSearchRequest, nameSearchRequestCategory } from './graphqlRequests'

// Return true if a string is a prefixed unicode codepoint value
const isNotPrefixedCodepointValue = compose(not, test(/^U\+[0-9A-Fa-f]{4,6}/))

export default function({ Action, Time, Http }) {

  const nameSearch$ = Action
    .filter(propEq('type', changeSearch.toString()))
    .map(prop('payload'))
    .filter(isNotPrefixedCodepointValue)
    .let(Time.debounce(250))
    .distinctUntilChanged()
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
