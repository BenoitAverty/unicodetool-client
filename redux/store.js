import {createStore, applyMiddleware} from 'redux'
import {run} from '@cycle/run'
import {createCycleMiddleware} from 'redux-cycles'

import reducer from './reducer'
import cycles from './cycles'

const cycleMiddleware = createCycleMiddleware()
const {makeActionDriver} = cycleMiddleware

const makeStore = (initialState) => createStore(reducer, initialState, applyMiddleware(cycleMiddleware))

run(cycles, { action: makeActionDriver() })

export default makeStore
