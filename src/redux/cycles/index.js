import search from './searchCycles'

export default function cycles(sources) {

  const searchSinks = search(sources)

  return searchSinks
}
