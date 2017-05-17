import { Observable } from 'rxjs'

export default function search({ Action, Http, Time }) {

  return {
    Action: Observable.never(),
    Http: Action.filter(a => a.payload !== '').mapTo({
      url: 'http://localhost:8080/graphql',
      category: 'codepoint-search',
      method: 'POST',
      send: {
        query: `query findCodepoint($value: CodepointValue!) {
          codepoint(value: $value) {
            value
            name
            properties {
              block
              generalCategory
            }
          }
        }`,
        variables: `{
          "value": "U+0041"
        }`
      }
    })
  }
}
