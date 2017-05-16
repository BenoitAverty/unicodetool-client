import { Observable } from 'rxjs'

export default function search({ action }) {

  return {
    action: Observable.never()
  }
}
