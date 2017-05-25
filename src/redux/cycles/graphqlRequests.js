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

export const nameSearchQuery = `query nameSearch($name: String!) {
  codepointSearch(name: $name) {
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
export const nameSearchRequestCategory = 'name-search'
export function nameSearchRequest(name) {
  return {
    url: 'https://unicodetool-api.now.sh/graphql',
    category: nameSearchRequestCategory,
    method: 'POST',
    send: {
      query: nameSearchQuery,
      variables: JSON.stringify({
        name
      })
    }
  }
}

export const lookupAndSearchQuery = `query lookupAndSearch($name: String!, $value: CodepointValue!) {
  codepointSearch(name: $name) {
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
export const lookupAndSearchRequestCategory = 'codepoint-lookup+name-search'
export function lookupAndSearchRequest(search) {
  return {
    url: 'https://unicodetool-api.now.sh/graphql',
    category: lookupAndSearchRequestCategory,
    method: 'POST',
    send: {
      query: lookupAndSearchQuery,
      variables: JSON.stringify({
        name: search,
        value: search
      })
    }
  }
}
