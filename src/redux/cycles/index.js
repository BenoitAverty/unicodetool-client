import { combineCycles } from 'redux-cycles'

import searchCycles from './searchCycles'
import codepointDetailsCycle from './codepointDetailsCycles'

export default combineCycles(searchCycles, codepointDetailsCycle)
