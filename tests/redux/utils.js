import { Observable } from 'rxjs'

export function mockHttpSource (response$) {
  const httpSource = {
    select: cat =>
      Observable.of(
        response$.filter(r => !r.request || r.request.category === cat)
      )
  }

  return httpSource
}
