import { fixCypressSpec } from '../../support/index';
import HomePage from '../../support/page/home.page';
import PostPage from '../../support/page/post.page';

const homePage = new HomePage();
const postPage = new PostPage();

describe('Search feature test', () => {
    beforeEach(fixCypressSpec(__filename));

    context('Search for The Test 5', () => {
        let keyword = "The First 5";
        it('Navigate to ATWT website and wait for page load', () => {
            homePage.navigateHome();
        })

        it('Search with keyword The First 5', () => {

            homePage.clickSearchBtn()
                .enterKeywordSearch(keyword)
                .verifyFirstResultPostSearch(keyword)
                .clickOnTitlePost(keyword)
        })

        it('Validate title and author', () => {
            postPage.verifyPostlResultHeader(keyword)
                .verifyAuthor("Tuyen Nguyen");
        })
    })

    context('Search for Interface vs Abstract', () => {
        let keyword = "Interface vs Abstract";
        it('Navigate to ATWT website and wait for page load', () => {
            homePage.navigateHome();
        })

        it('Search with keyword Interface vs Abstract', () => {

            homePage.clickSearchBtn()
                .enterKeywordSearch(keyword)
                .verifyFirstResultPostSearch(keyword)
                .clickOnTitlePost(keyword)
        })

        it('Validate title and author', () => {
            postPage.verifyPostlResultHeader(keyword)
                .verifyAuthor("Tuyen Nguyen");
        })
    })
})