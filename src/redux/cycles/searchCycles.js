import { Observable } from 'rxjs'

import codepointLookup from './codepointLookupCycles'
import nameSearch from './nameSearchCycles'

export default function searchCycles(sources) {

  const codepointLookupSinks = codepointLookup(sources)
  const nameSearchSinks = nameSearch(sources)

  return {
    Http: Observable.merge(codepointLookupSinks.Http, nameSearchSinks.Http),
    Action: Observable.merge(codepointLookupSinks.Action, nameSearchSinks.Action),
  }
}
