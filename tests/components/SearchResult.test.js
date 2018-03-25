/* eslint-env jest */
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import SearchResult from '../../src/components/SearchResult'

describe('SearchResult component', () => {
  describe('Before any search happened', () => {
    it('matches snapshot', () => {
      const comp = shallow(<SearchResult status="IDLE" />)

      expect(toJson(comp)).toMatchSnapshot()
    })
  })

  describe('When a search returned nothing', () => {
    it('matches snapshot', () => {
      const comp = shallow(<SearchResult status="SUCCESS">{[]}</SearchResult>)

      expect(toJson(comp)).toMatchSnapshot()
    })
  })

  describe('When a search returned a codepoint', () => {
    it('matches snapshot', () => {
      const comp = shallow(
        <SearchResult status="SUCCESS">
          <p>Dummy content</p>
        </SearchResult>,
      )

      expect(toJson(comp)).toMatchSnapshot()
    })
  })

  describe('When a search returned several codepoints', () => {
    it('matches snapshot', () => {
      const comp = shallow(
        <SearchResult status="SUCCESS">
          <p>Dummy content</p>
          <p>Dummy content</p>
        </SearchResult>,
      )

      expect(toJson(comp)).toMatchSnapshot()
    })
  })
})
