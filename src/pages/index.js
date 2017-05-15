import withRedux from 'next-redux-wrapper'
import { Jumbotron } from 'reactstrap'

import makeStore from '../redux/store'

import Layout from '../components/Layout'
import Dispatcher from '../components/Dispatcher'
import CounterWarning from '../components/CounterWarning'

const Index = props => (
  <Layout>
    <Jumbotron>
      <h1 className='display-3'>Title</h1>
    </Jumbotron>
    <div style={{ 'text-align': 'center' }}>
      <CounterWarning count={props.count} maxCount={5} />
      <p>Next + Redux + Redux-Cycles : {props.count}</p>
      <Dispatcher />
    </div>
  </Layout>
)

export default withRedux(makeStore, state => state)(Index)
