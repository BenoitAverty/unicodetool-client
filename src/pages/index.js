import withRedux from 'next-redux-wrapper'

import makeStore from '../redux/store'

import Layout from '../components/Layout'
import Dispatcher from '../components/Dispatcher'
import CounterWarning from '../components/CounterWarning'

const Index = props => (
  <Layout>
    <div>
      <CounterWarning count={props.count} maxCount={5} />
      <p>Next + Redux + Redux-Cycles : {props.count}</p>
      <Dispatcher />
    </div>
  </Layout>
)

export default withRedux(makeStore, state => state)(Index)
