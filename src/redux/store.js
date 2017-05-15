import { createStore, applyMiddleware, compose } from 'redux'
import { run } from '@cycle/run'
import { createCycleMiddleware } from 'redux-cycles'

import reducer from './reducer'
import cycles from './cycles'

const cycleMiddleware = createCycleMiddleware()
const { makeActionDriver } = cycleMiddleware

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const makeStore = initialState =>
  createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(cycleMiddleware))
  )

run(cycles, { action: makeActionDriver() })

export default makeStore
