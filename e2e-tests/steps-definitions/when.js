/* global browser */
/*
 * When Steps
 */

const { defineSupportCode } = require('cucumber')

const homePage = require('../pages/home.page')

defineSupportCode(({ When }) => {
  When(/I type "(.*)" in the search field/, searchString => {
    browser.waitForVisible(homePage.searchField)
    browser.setValue(homePage.searchField, searchString)
  })
})
