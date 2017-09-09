const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const sauceUser = process.env.SAUCE_USER || ''
const sauceKey = process.env.SAUCE_KEY || ''

exports.config = {
  "tests": "./e2e-tests/*.js",
  "timeout": 10000,
  "output": "./e2e-tests/output",
  "helpers": {
    "WebDriverIO": {
      "url": baseUrl,
      "host": "ondemand.saucelabs.com",
      "browser": "chrome",
      "user": sauceUser,
      "key": sauceKey,
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    }
  },
  "include": {},
  "bootstrap": false,
  "mocha": {},
  "name": "unicodetool-client"
}