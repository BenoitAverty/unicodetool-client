import withRedux from 'next-redux-wrapper'

import makeStore from '../redux/store'
import Dispatcher from '../components/Dispatcher'

const Index = props => (
  <div>
    <p>Next + Redux + Redux-Cycles : {props.count}</p>
    <Dispatcher />
  </div>
)

export default withRedux(makeStore, state => state)(Index)
