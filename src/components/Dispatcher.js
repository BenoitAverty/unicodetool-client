import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { increment } from '../redux/actions'

const Dispatcher = props => (
  <Button color='success' onClick={props.onClick}>Dispatch an action</Button>
)

export default connect(null, dispatch => ({
  onClick: () => dispatch(increment())
}))(Dispatcher)
