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


export function codepointSearchRequest(codepoint) {
  return {
    url: 'http://localhost:8080/graphql',
    category: 'codepoint-search',
    method: 'POST',
    send: {
      query: findCodepointQuery,
      variables: JSON.stringify({
        value: codepoint
      })
    }
  }
}
