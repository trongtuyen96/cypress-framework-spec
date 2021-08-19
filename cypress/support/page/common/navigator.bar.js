class NavigatorBar {
    LOGIN_BTN = '//button[.="Log In"]';
    HOME_BTN = '//p[.="HOME"]';
    FORUM_BTN = '//p[.="FORUM"]';
    AUTHOR_BTN = '//p[.="AUTHOR"]';
    USER_BTN = '//div[contains(@id,"defaultAvatar")]';
    USER_NAME = '//button[contains(@aria-label,"account menu")]/div[position()=2]'

    clickLoginBtn() {
        cy.xpath(this.LOGIN_BTN).click();
        return this;
    }

    clickHomeBtn() {
        cy.xpath(this.HOME_BTN).click();
        return this;
    }

    clickForumBtn() {
        cy.xpath(this.FORUM_BTN).click();
        return this;
    }

    clickAuthorBtn() {
        cy.xpath(this.AUTHOR_BTN).click();
        return this;
    }

    clickUserBtn() {
        cy.xpath(this.USER_BTN).click();
        return this;
    }

    verifyLoginUser() {
        cy.xpath(this.USER_NAME, { timeout: 10000 }).invoke('text')
            .then((username) => {
                cy.fixture('testdata.json').then((td) => {
                    expect(username.trim()).to.equal(td.firstname + td.lastname);
                })
            })
        return this;
    }
}

module.exports = NavigatorBar;