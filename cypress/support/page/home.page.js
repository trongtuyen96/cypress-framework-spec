class HomePage {
    CATE_ALL_BTN = '//a[.="ALL"]';
    CATE_PATTERNS_BTN = '//a[.="PATTERNS"]';
    CATE_TOOLS_BTN = '//a[.="TOOLS"]';
    CATE_FRAMEWORKS_BTN = '//a[.="FRAMEWORKS"]';
    SEARCH_BTN = '//div[@aria-label="Search"]';
    SEARCH_BOX = '//input[@placeholder="Search"]';
    POST_TITLE_SEARCH = '//a[contains(@class,"blog-link-hover")]';
    POST_TITLE_LINK = '//div[contains(@class,"search-result")]//h2[contains(@class,"post-title blog-hover")]';
    BANNER_BG = '//div[@data-testid="container-bg"]';
    POST_IMAGE_LOADED = '(//div[contains(@style,"file.webp")])[1]'

    navigateHome() {
        cy.visit("/");

        // cy.get('.some-element-in-your-app-that-only-exists-once-page-has-loaded', { timeout: 30000 })

        // Special case: Wait for page fully loaded and rendered
        cy.xpath(this.POST_IMAGE_LOADED, {timeout: 30000});
        return this;
    }

    clickCateAllBtn() {
        cy.xpath(this.CATE_ALL_BTN).click();
        return this;
    }

    clickCatePatternsBtn() {
        cy.xpath(this.CATE_PATTERNS_BTN).click();
        return this;
    }

    clickCatePatternsBtn() {
        cy.xpath(this.CATE_PATTERNS_BTN).click();
        return this;
    }

    clickCateToolsBtn() {
        cy.xpath(this.CATE_TOOLS_BTN).click();
        return this;
    }

    clickCateFrameworksBtn() {
        cy.xpath(this.CATE_FRAMEWORKS_BTN).click();
        return this;
    }

    clickSearchBtn() {
        cy.xpath(this.SEARCH_BTN).click();
        return this;
    }

    enterKeywordSearch(keyword) {
        cy.xpath(this.SEARCH_BOX)
            .type(keyword, { timeout: 10000 })
            .type('{enter}')
        return this;
    }

    clickOnTitlePost(keyword) {
        cy.xpath(this.POST_TITLE_SEARCH, { timeout: 10000 }).click();
        return this;
    }

    verifyFirstResultPostSearch(keyword) {
        cy.xpath(this.POST_TITLE_LINK, { timeout: 10000 }).invoke('text')
            .then((postTitle) => {
                expect(postTitle.trim().toLowerCase()).to.include(keyword.trim().toLowerCase());
            })
        return this;
    }

    verifyBannerImage() {
        cy.xpath(this.BANNER_BG).toMatchSnapshot();
        return this;
    }
}

module.exports = HomePage;