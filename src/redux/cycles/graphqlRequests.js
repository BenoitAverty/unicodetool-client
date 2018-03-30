const graphqlEndpointUrl = 'https://unicodetool-api.now.sh/graphql'

export const codepointDetailsQuery = `query codepointDetails($value: CodepointValue!) {
  codepoint(value: $value) {
    value
    name
    ... on Character {
      character
    }
    properties {
      name
      block
      age
      generalCategory
      script
      whiteSpace
      alphabetic
      hangulSyllabeType
      nonCharacterCodePoint
      defaultIgnorableCodePoint
      deprecated
      logicalOrderException
      variationSelector
      uppercase
      lowercase
      simpleLowercaseMapping
      simpleTitlecaseMapping
      simpleUppercaseMapping
      simpleCaseFolding
      softDotted
      cased
      caseIgnorable
      changesWhenLowercased
      changesWhenUppercased
      changesWhenTitlecased
      changesWhenCasefolded
      changesWhenCasemapped
      numericValue
      numericType
      hexDigit
      asciiHexDigit
      canonicalCombiningClass
      compositionExclusion
      fullCompositionExclusion
      decompositionType
      nfcQuickCkeck
      nfkcQuickCheck
      nfdQuickCheck
      nfkdQuickCheck
      expandsOnNfc
      expandsOnNfkc
      expandsOnNfd
      expandsOnNfkd
      changesWhenNfkcCaseFolded
      joinControl
      joiningGroup
      joiningType
      lineBreak
      graphemeClusterBreak
      sentenceBreak
      wordBreak
      eastAsianWidth
      prependConcatenationMark
      bidiClass
      bidiControl
      bidiMirrored
      bidiMirroringGlyph
      bidiPairedBracket
      bidiPairedBracketType
      idContinue
      idStart
      xidContinue
      xidStart
      patternSyntax
      patternWhiteSpace
      ideographic
      unifiedIdeograph
      radical
      idsBinaryOperator
      idsTrinaryOperator
      math
      quotationMark
      dash
      hyphen
      sentenceTerminal
      terminalPunctuation
      diacritic
      extender
      graphemeBase
      graphemeExtend
      graphemeLink
      unicode1Name
      isoComment
      indicPositionalCategory
      indicSyllabicCategory
      otherAlphabetic
      otherDefaultIgnorableCodePoint
      otherGraphemeExtend
      otherIdStart
      otherIdContinue
      otherLowercase
      otherMath
      otherUppercase
      jamoShortName
    }
  }
}`

export const codepointDetailsRequest = category => codepoint => ({
  url: graphqlEndpointUrl,
  category,
  method: 'POST',
  send: {
    query: codepointDetailsQuery,
    variables: JSON.stringify({
      value: codepoint,
    }),
  },
})

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

export const codepointLookupRequest = category => codepoint => ({
  url: graphqlEndpointUrl,
  category,
  method: 'POST',
  send: {
    query: codepointLookupQuery,
    variables: JSON.stringify({
      value: codepoint,
    }),
  },
})

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
export const nameSearchRequest = category => name => ({
  url: graphqlEndpointUrl,
  category,
  method: 'POST',
  send: {
    query: nameSearchQuery,
    variables: JSON.stringify({
      name,
    }),
  },
})

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
export const lookupAndSearchRequest = category => search => ({
  url: graphqlEndpointUrl,
  category,
  method: 'POST',
  send: {
    query: lookupAndSearchQuery,
    variables: JSON.stringify({
      name: search,
      value: search,
    }),
  },
})
