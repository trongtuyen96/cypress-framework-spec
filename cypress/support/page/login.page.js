class LoginPage {
    LOGIN_LINK = '//button[@data-testid="signUp.switchToSignUp"]';
    LOGIN_EMAIL_BTN = '//button[.="Log in with Email"]';
    EMAIL_INPUT = '//input[contains(@id,"emailInput")]';
    PASSWORD_INPUT = '//input[contains(@id,"passwordInput")]';
    LOGIN_BTN = '//button[contains(.,"Log In") and @data-testid = "buttonElement"]';

    clickLoginLink() {
        cy.xpath(this.LOGIN_LINK).click();
        return this;
    }

    clickLoginWithEmailBtn() {
        cy.xpath(this.LOGIN_EMAIL_BTN).click();
        return this;
    }

    enterEmail() {
        cy.fixture('testdata.json').then((td) => {
            cy.xpath(this.EMAIL_INPUT)
                .click()
                .clear()
                .type(td.validemail);
        });
        return this;
    }

    enterPassword() {
        cy.fixture('testdata.json').then((td) => {
            cy.xpath(this.PASSWORD_INPUT)
                .click()
                .clear()
                .type(td.validpassword);
        });
        return this;
    }

    clickLoginBtn() {
        cy.xpath(this.LOGIN_BTN).click();
        return this;
    }

    login(email, password) {
        cy.xpath(this.EMAIL_INPUT)
            .click()
            .clear()
            .type(email);
        cy.xpath(this.PASSWORD_INPUT)
            .click()
            .clear()
            .type(password);
        return this;
    }
}

module.exports = LoginPage;