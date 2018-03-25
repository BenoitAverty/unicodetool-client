/* eslint-env jest */
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import CodepointSummary from '../../src/components/CodepointSummary'

configure({ adapter: new Adapter() })

describe('CodepointSummary component', () => {
  describe('With a complete codepoint', () => {
    it('matches snapshot', () => {
      const codepoint = {
        value: 'U+0041',
        name: 'LATIN CAPITAL LETTER A',
        properties: {
          block: 'ASCII',
          generalCategory: 'Lu',
        },
      }

      const comp = shallow(<CodepointSummary codepoint={codepoint} />)

      expect(toJson(comp)).toMatchSnapshot()
    })
  })

  describe('With a combining mark codepoint', () => {
    it('matches snapshot', () => {
      const codepoint = {
        value: 'U+0307',
        name: 'COMBINING DOT ABOVE',
        properties: {
          block: 'Diacriticals',
          generalCategory: 'Mn',
        },
      }

      const comp = shallow(<CodepointSummary codepoint={codepoint} />)

      expect(toJson(comp)).toMatchSnapshot()
    })
  })
})
