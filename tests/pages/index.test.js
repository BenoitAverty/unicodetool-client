import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'

import { withoutRedux as Index } from '../../src/pages/index.js'

describe('Index page', () => {
  it('matches snapshot', () => {
    const page = shallow(
      <Index currentSearch='current search' handleSearchChange={() => {}} />
    )

    expect(toJson(page)).toMatchSnapshot()
  })

  it('fires the proper callback when the search field changes', () => {
    const callbackMock = jest.fn()
    const page = shallow(
      <Index currentSearch='current search' handleSearchChange={callbackMock} />
    )

    page.find('UnicodeSearchField').simulate('change', 'new value')

    expect(callbackMock.mock.calls.length).toBe(1)
    expect(callbackMock.mock.calls[0][0]).toBe('new value')
  })
})
