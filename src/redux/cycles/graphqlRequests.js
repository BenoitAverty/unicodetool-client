export const codepointLookupQuery = `query findCodepoint($value: CodepointValue!) {
  codepoint(value: $value) {
    value
    name
    ... on Character {
      character
    }
    properties {
      block
      generalCategory
    }
  }
}`

export const codepointLookupRequestCategory = 'codepoint-lookup'
export function codepointLookupRequest(codepoint) {
  return {
    url: 'https://unicodetool-api.now.sh/graphql',
    category: codepointLookupRequestCategory,
    method: 'POST',
    send: {
      query: codepointLookupQuery,
      variables: JSON.stringify({
        value: codepoint
      })
    }
  }
}
