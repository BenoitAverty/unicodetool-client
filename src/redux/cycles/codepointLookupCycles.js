import { Observable } from 'rxjs'
import { prop, propEq, test } from 'ramda'

import { changeSearch, codepointLookupStarted, searchResultReceived } from '../actions'
import { codepointLookupRequest, codepointLookupRequestCategory } from './graphqlRequests'

// Return true if a string has the format of a codepoint
const isCodepoint = test(/^(U\+)?[0-9A-Fa-f]{4,6}/)

export default function codepointLookup({ Action, Http, Time }) {

  const codepointLookup$ = Action
    .filter(propEq('type', changeSearch.toString()))
    .map(prop('payload'))
    .let(Time.debounce(250))
    .distinctUntilChanged()
    .filter(isCodepoint)
    .map(codepointLookupRequest)

  const codepointLookupStartedAction$ = codepointLookup$.mapTo(codepointLookupStarted())

  const searchResultAction$ = Http
    .select(codepointLookupRequestCategory)
    .switch()
    .map(prop('body'))
    .map(searchResultReceived)

  return {
    Action: Observable.merge(codepointLookupStartedAction$, searchResultAction$),
    Http: codepointLookup$
  }
}
