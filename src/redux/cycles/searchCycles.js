import { Observable } from 'rxjs'
import { pipe, prop, not, isNil } from 'ramda'

export default function search({ action }) {

  return {
    action: Observable.never(),
    http: action.filter(a => a.payload !== '').mapTo({
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
