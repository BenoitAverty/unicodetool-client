export const findCodepointQuery = `query findCodepoint($value: CodepointValue!) {
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

export const codepointSearchRequestCategory = 'codepoint-search'
export function codepointSearchRequest(codepoint) {
  return {
    url: 'http://localhost:8080/graphql',
    category: codepointSearchRequestCategory,
    method: 'POST',
    send: {
      query: findCodepointQuery,
      variables: JSON.stringify({
        value: codepoint
      })
    }
  }
}
