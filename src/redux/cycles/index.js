import codepointLookup from './codepointLookupCycles'

export default function cycles(sources) {

  const codepointLookupSinks = codepointLookup(sources)

  return codepointLookupSinks
}
