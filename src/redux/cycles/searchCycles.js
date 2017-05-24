import { Observable } from 'rxjs'
import { prop, propEq, test, compose, not, ifElse, isNil, F, pipe, trim, isEmpty } from 'ramda'

import { changeSearch, codepointLookupStarted, nameSearchStarted, searchResultReceived } from '../actions'
import { codepointLookupRequest, codepointLookupRequestCategory, nameSearchRequest, nameSearchRequestCategory } from './graphqlRequests'

const isNotPrefixedCodepoint = compose(not, test(/^U\+[0-9A-Fa-f]{4,6}/))
const isCodepoint = test(/^(U\+)?[0-9A-Fa-f]{4,6}/)

export default function searchCycles({ Action, Http, Time }) {
  // Get the valid changes of the seearch field
  const search$ = Action.filter(propEq('type', changeSearch.toString()))
    .map(prop('payload'))
    .let(Time.debounce(250))
    .distinctUntilChanged()

  // Each time the search field change to a correct value, send the right graphql request based
  // on search field content
  const codepointLookupRequest$ = search$.filter(isCodepoint).map(codepointLookupRequest)
  const nameSearchRequest$ = search$.filter(isNotPrefixedCodepoint).map(nameSearchRequest)

  // For each request, send an action to notify it started
  const codepointLookupAction$ = codepointLookupRequest$.mapTo(codepointLookupStarted())
  const nameSearchRequestAction$ = nameSearchRequest$.mapTo(nameSearchStarted())

  // When an answer arrives, send the result to redux with the searchResultReceived action
  const searchResultAction$ = Http.select().switch().map(prop('body')).map(searchResultReceived)

  return {
    Http: Observable.merge(
      codepointLookupRequest$,
      nameSearchRequest$
    ),
    Action: Observable.merge(
      codepointLookupAction$,
      nameSearchRequestAction$,
      searchResultAction$
    ),
  }
}
