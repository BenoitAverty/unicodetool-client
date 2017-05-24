import { Observable } from 'rxjs'

export function mockHttpSource (response$) {
  const httpSource = {
    select: cat =>
      Observable.of(
        response$.filter(r => !cat || !r.request || r.request.category === cat)
      )
  }

  return httpSource
}
