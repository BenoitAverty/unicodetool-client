import { Observable } from 'rxjs'
import { ifElse, prop, propEq, isEmpty, not, isNil, pipe, trim, F } from 'ramda'

import { codepointSearchRequest } from './graphqlRequests'

// Return true if a string is neither undefined nor empty
const isNotBlank = ifElse(isNil, F, pipe(trim, isEmpty, not))

export default function search({ Action, Http, Time }) {

  const codepointRequest$ = Action
    .filter(propEq('type', 'CHANGE_SEARCH'))
    .let(Time.debounce(250))
    .map(prop('payload'))
    .filter(isNotBlank)
    .map(codepointSearchRequest)

  return {
    Action: Observable.never(),
    Http: codepointRequest$
  }
}
