export default function cycles ({ action }) {
  return {
    action: action
      .filter(a => a.type === 'CHANGE_SEARCH')
      .map(a => ({ ...a, payload: `${a.payload}+${a.payload}` }))
      .take(1)
  }
}
