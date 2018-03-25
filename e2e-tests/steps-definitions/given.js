/* global browser */
/*
 * Given Steps
 */

const { defineSupportCode } = require('cucumber')

const homePage = require('../pages/home.page')

defineSupportCode(({ Given }) => {
  Given(/^I am on the Home Page$/, () => {
    browser.url(homePage.url)
  })
})
