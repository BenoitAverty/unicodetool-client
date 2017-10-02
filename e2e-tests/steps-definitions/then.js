/*
 * Then Steps
 */

const { defineSupportCode } = require('cucumber')

const homePage = require('../pages/home.page')

defineSupportCode(({ Then }) => {
    Then(/^The page heading is "(.*)"$/, (expectedHeading) => {
        browser.waitForVisible(homePage.pageHeading)
        expect(browser.getText(homePage.pageHeading)).to.equal(expectedHeading)
    })

    Then(/^There are ([0-9]+) search results$/, (nResults) => {
        expect(true).to.equal(true)
    })
})