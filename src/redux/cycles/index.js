import { Observable } from 'rxjs'
import { mergeWith } from 'ramda'

import searchCycles from './searchCycles'
import codepointDetailsCycle from './codepointDetailsCycles'

export default function(sources) {
  const searchSinks = searchCycles(sources)
  const codepointDetailsSinks = codepointDetailsCycle(sources)

  return mergeWith(Observable.merge, searchSinks, codepointDetailsSinks)
}
