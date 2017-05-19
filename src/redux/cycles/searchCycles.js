import { Observable } from 'rxjs'
import { ifElse, prop, propEq, isEmpty, not, isNil, pipe, trim, F } from 'ramda'

import { changeSearch, searchStarted, searchResultReceived } from '../actions'
import { codepointSearchRequest, codepointSearchRequestCategory } from './graphqlRequests'

// Return true if a string is neither undefined nor empty
const isNotBlank = ifElse(isNil, F, pipe(trim, isEmpty, not))

export default function search({ Action, Http, Time }) {

  const codepointRequest$ = Action
    .filter(propEq('type', changeSearch.toString()))
    .let(Time.debounce(250))
    .map(prop('payload'))
    .distinctUntilChanged()
    .filter(isNotBlank)
    .map(codepointSearchRequest)

  const searchStartedAction$ = codepointRequest$.mapTo(searchStarted())

  const searchResultAction$ = Http
    .select(codepointSearchRequestCategory)
    .switch()
    .map(prop('body'))
    .map(searchResultReceived)

  return {
    Action: Observable.merge(searchStartedAction$, searchResultAction$),
    Http: codepointRequest$
  }
}
