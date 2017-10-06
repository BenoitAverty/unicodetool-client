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

    Then(/^There (are|is) ([0-9]+) search results?$/, (_, nResults) => {
        browser.waitForVisible(homePage.searchResult)

        const elems = browser.elements(homePage.searchResultItems).value.length || 0
        expect(`${elems}`).to.equal(nResults)
    })

    Then(/^The codepoint "(U\+[0-9A-F]{4,6}) (.+)" \((.*)\) is present in the results$/, (codepoint, name, char) => {
        browser.waitForVisible(homePage.searchResult)

        const elements = browser.elements(homePage.searchResult).getText(homePage.searchResultItems)
        
        if(elements.reduce) {
            expect(elements.reduce((acc, curr) => acc + curr)).to.include(`${char}\n${codepoint} ${name}`)
        }
        else {
            expect(elements).to.include(`${char}\n${codepoint} ${name}`)
        }
    })
})