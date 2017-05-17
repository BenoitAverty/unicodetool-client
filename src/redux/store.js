import { createStore, applyMiddleware, compose } from 'redux'
import { run } from '@cycle/rxjs-run'
import { createCycleMiddleware } from 'redux-cycles'
import { makeHTTPDriver } from '@cycle/http'

import reducer from './reducer'
import cycles from './cycles'

const cycleMiddleware = createCycleMiddleware()
const { makeActionDriver } = cycleMiddleware

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export default function makeStore (initialState) {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(cycleMiddleware))
  )

  run(cycles, { action: makeActionDriver(), http: makeHTTPDriver() })

  return store
}
