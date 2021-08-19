class PostPage {
    POST_PAGE_HEADER = '//span[contains(@class,"blog-post-title")]';
    POST_AUTHOR = '//span[contains(@data-hook,"user-name")]';

    verifyPostlResultHeader(keyword) {
        cy.xpath(this.POST_PAGE_HEADER, { timeout: 10000 }).invoke('text')
            .then((postheader) => {
                expect(postheader.trim().toLowerCase()).to.include(keyword.toLowerCase());
            });
        return this;
    }

    verifyAuthor(authorname) {
        cy.xpath(this.POST_AUTHOR, { timeout: 10000 }).invoke('text')
            .then((postauthor) => {
                expect(postauthor.trim().toLowerCase()).to.equal(authorname.toLowerCase());
            });
        return this;
    }
}

module.exports = PostPage;