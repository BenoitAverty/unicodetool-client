import { Observable } from 'rxjs'
import { prop, propEq } from 'ramda'

import { changeSearch, nameSearchStarted } from '../actions'
import { nameSearchRequest } from './graphqlRequests'

export default function({ Action, Time }) {

  const nameSearch$ = Action
    .filter(propEq('type', changeSearch.toString()))
    .map(prop('payload'))
    .let(Time.debounce(250))
    .map(nameSearchRequest)

  const action$ = nameSearch$.mapTo(nameSearchStarted())

  return {
    Action:action$,
    Http: nameSearch$
  }
}
