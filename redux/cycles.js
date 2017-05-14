export default function cycles({ action }) {
  return {
    action: action.take(2)
  }
}
