import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'

import CodepointSummary from '../../src/components/CodepointSummary'

describe('CodepointSummary component', () => {
  describe('With a complete codepoint', () => {
    it('matches snapshot', () => {
      const codepoint = {
        value: 'U+0041',
        name: 'LATIN CAPITAL LETTER A',
        properties: {
          block: 'ASCII',
          generalCategory: 'Lu'
        }
      }

      const comp = shallow(<CodepointSummary codepoint={codepoint} />)

      expect(comp).toMatchSnapshot()
    })
  })
})
