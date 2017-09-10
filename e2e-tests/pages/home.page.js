const Page = require('./page')

const examplePage = Object.create(Page, {
    url: { value: '/' },
    pageHeading: { value: '#page-title' },
})

module.exports = examplePage

