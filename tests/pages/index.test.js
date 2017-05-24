import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { withoutRedux as Index } from '../../src/pages/index.js'

describe('Index page', () => {
  describe('Without search results', () => {
    it('matches snapshot', () => {
      const page = shallow(
        <Index
          currentSearch='current search'
          handleSearchChange={() => {}}
          searchStatus='IDLE'
        />
      )

      expect(toJson(page)).toMatchSnapshot()
    })

    it('fires the proper callback when the search field changes', () => {
      const callbackMock = jest.fn()
      const page = shallow(
        <Index
          currentSearch='current search'
          handleSearchChange={callbackMock}
        />
      )

      page.find('UnicodeSearchField').simulate('change', 'new value')

      expect(callbackMock.mock.calls.length).toBe(1)
      expect(callbackMock.mock.calls[0][0]).toBe('new value')
    })

    it('fires the changeSearch callback when clicking on suggestions', () => {
      const callbackMock = jest.fn()
      const page = shallow(
        <Index
          currentSearch='current search'
          handleSearchChange={callbackMock}
        />
      )

      const links = page.find('a.suggestionLink')
      const expectedCalls = [['U+0041'], ['HEART'], ['à']]
      links.forEach(l => {
        l.simulate('click')
      })
      expect(callbackMock.mock.calls).toEqual(expectedCalls)
    })
  })

  describe('While fetching', () => {
    it('Matches snapshot', () => {
      const page = shallow(
        <Index
          currentSearch='U+0041'
          searchResult={[]}
          searchStatus='FETCHING'
        />
      )
      expect(toJson(page)).toMatchSnapshot()
    })
  })

  describe('With a codepoint search result (1 codepoint result)', () => {
    it('matches snapshot', () => {
      const searchResult = [
        {
          value: 'U+0041',
          name: 'LATIN CAPITAL LETTER A',
          properties: {
            block: 'ASCII',
            generalCategory: 'Lu'
          }
        }
      ]
      const page = shallow(
        <Index
          currentSearch='U+0041'
          searchResult={searchResult}
          searchStatus='SUCCESS'
        />
      )
      expect(toJson(page)).toMatchSnapshot()
    })
  })
})
