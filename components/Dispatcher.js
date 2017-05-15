import { connect } from 'react-redux'

import { increment } from '../redux/actions'

const Dispatcher = props => (
  <button onClick={props.onClick}>Dispatch an action</button>
)

export default connect(null, dispatch => ({
  onClick: () => dispatch(increment())
}))(Dispatcher)
