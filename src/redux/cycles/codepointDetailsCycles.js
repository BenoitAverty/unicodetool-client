import { prop, propEq, path } from 'ramda'

import {
  fetchCodepointDetails,
  codepointLookupSuccess,
  /* codepointLookupFailure */
} from '../actions'
import { codepointDetailsRequest } from './graphqlRequests'

const codepointDetailsRequestCategory = 'codepoint-details'

export default function codepointLookup({ Action, Http }) {
  const codepointDetailsRequest$ = Action.filter(propEq('type', fetchCodepointDetails.toString()))
    .map(prop('payload'))
    .map(codepointDetailsRequest(codepointDetailsRequestCategory))

  const detailsRequestResult$ = Http.select(codepointDetailsRequestCategory)
    .switch()
    .map(path(['body', 'data', 'codepoint']))
    .map(codepointLookupSuccess)

  return {
    Action: detailsRequestResult$,
    Http: codepointDetailsRequest$,
  }
}
