/* global browser */
/** Stateless prototype object required for all pages */

class Page {
  static open(path) {
    browser.url(`/${path}`)
  }
}

module.exports = new Page()
