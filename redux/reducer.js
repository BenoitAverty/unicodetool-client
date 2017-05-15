export default (state = { count: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      count: state.count + 1
    }
  }

  return state
}
