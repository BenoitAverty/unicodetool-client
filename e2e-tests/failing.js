Feature('Failing');

Scenario('Seeing A non existant home page', (I) => {
    I.amOnPage("/")
    I.see("Failing")
});
