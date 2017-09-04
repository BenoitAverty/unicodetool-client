import { createStore, applyMiddleware, compose } from 'redux'
import { run } from '@cycle/rxjs-run'
import { makeHTTPDriver } from '@cycle/http'
import { timeDriver } from '@cycle/time/lib/rxjs'
import { createCycleMiddleware } from 'redux-cycles'

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

  run(cycles, {
    Action: makeActionDriver(),
    Http: makeHTTPDriver(),
    Time: timeDriver
  })

  return store
}
