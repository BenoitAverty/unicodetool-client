const Page = require('./page')

const homePage = Object.create(Page, {
    url: { value: '/' },
    pageHeading: { value: '#page-title' },
    searchField: { value: '.UnicodeSearchField > input' },
})

module.exports = homePage

