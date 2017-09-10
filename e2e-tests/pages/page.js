/** Stateless prototype object required for all pages **/

function Page() {
}

Page.prototype.open = function (path) {
    browser.url('/' + path);
};

module.exports = new Page();