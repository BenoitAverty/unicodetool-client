import { Observable } from 'rxjs'
import { prop, propEq, test, compose, not, ifElse, isNil, F, pipe, trim, isEmpty } from 'ramda'

import { changeSearch, nameSearchStarted, searchResultReceived } from '../actions'
import { nameSearchRequest, nameSearchRequestCategory } from './graphqlRequests'
