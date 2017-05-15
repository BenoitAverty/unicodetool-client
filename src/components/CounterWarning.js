import { Alert } from 'reactstrap'

export default function CounterWarning ({ count, maxCount }) {
  if (count > maxCount) {
    return <Alert color='danger'>You're above the count limit !</Alert>
  }

  if (count === maxCount) {
    return <Alert color='warning'>Careful. You're at the count limit.</Alert>
  }

  return null
}
