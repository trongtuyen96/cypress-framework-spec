class BasePage {

    navigateToMain() {
        cy.visit('/');
        return this;
    }

    // Child page can extends and write this to 
    // constructor() {
    //     super();
    // }
}

module.exports = BasePage;