import { Observable } from 'rxjs'
import { prop, propEq, test, compose, not, ifElse, isNil, F, pipe, trim, isEmpty } from 'ramda'

import {
  changeSearch,
  codepointLookupStarted,
  nameSearchStarted,
  searchResultReceived,
} from '../actions'
import {
  codepointLookupRequest,
  nameSearchRequest,
  lookupAndSearchRequest,
} from './graphqlRequests'

const isNotBlank = ifElse(isNil, F, pipe(trim, isEmpty, not))
const isNotCodepoint = compose(not, test(/[0-9A-Fa-f]{4,6}/))
const isUnprefixedCodepoint = test(/^[0-9A-Fa-f]{4,6}/)
const isPrefixedCodepoint = test(/^U\+[0-9A-Fa-f]{4,6}/)

export default function searchCycles({ Action, Http, Time }) {
  // Get the valid changes of the seearch field
  const search$ = Action.filter(propEq('type', changeSearch.toString()))
    .map(prop('payload'))
    .let(Time.debounce(250))
    .distinctUntilChanged()
    .filter(isNotBlank)

  // Each time the search field change to a correct value, send the right graphql request based
  // on search field content
  const codepointLookupRequest$ = search$.filter(isPrefixedCodepoint).map(codepointLookupRequest)
  const nameSearchRequest$ = search$.filter(isNotCodepoint).map(nameSearchRequest)
  const lookupAndSearchRequest$ = search$.filter(isUnprefixedCodepoint).map(lookupAndSearchRequest)

  // For each request, send an action to notify it started
  const codepointLookupAction$ = codepointLookupRequest$.mapTo(codepointLookupStarted())
  const nameSearchRequestAction$ = nameSearchRequest$.mapTo(nameSearchStarted())
  const lookupAndSearchRequestAction$ = Observable.merge(
    lookupAndSearchRequest$.mapTo(nameSearchStarted()),
    lookupAndSearchRequest$.mapTo(codepointLookupStarted()),
  )

  // When an answer arrives, send the result to redux with the searchResultReceived action
  const searchResultAction$ = Http.select()
    .mergeAll()
    .map(prop('body'))
    .map(searchResultReceived)

  return {
    Http: Observable.merge(codepointLookupRequest$, nameSearchRequest$, lookupAndSearchRequest$),
    Action: Observable.merge(
      codepointLookupAction$,
      nameSearchRequestAction$,
      lookupAndSearchRequestAction$,
      searchResultAction$,
    ),
  }
}
