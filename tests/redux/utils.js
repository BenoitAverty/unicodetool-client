import { Observable } from 'rxjs'

export function mockHttpSource (response$) {
  const httpSource = { select: cat => Observable.of(response$) }

  return httpSource
}
