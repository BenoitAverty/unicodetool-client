Feature('Is Up');

Scenario('Seeing the home page', (I) => {
    I.amOnPage("/")
    I.see("UnicodeTool")
});
