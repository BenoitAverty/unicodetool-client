import { Observable } from 'rxjs'

// Disable for now because we have only one export. Re-enable when there is another function here.
// eslint-disable-next-line
export function mockHttpSource(response$) {
  const httpSource = {
    select: cat =>
      Observable.of(response$.filter(r => !cat || !r.request || r.request.category === cat)),
  }

  return httpSource
}
