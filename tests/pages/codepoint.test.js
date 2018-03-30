/* eslint-env jest */
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { withoutRedux as CodepointPage } from '../../src/pages/codepoint'

configure({ adapter: new Adapter() })

describe('Codepoint page', () => {
  describe('With an existing codepoint', () => {
    it('matches snapshot', () => {
      const page = shallow(<CodepointPage codepoint={{}} />)

      expect(toJson(page)).toMatchSnapshot()
    })
  })
})
