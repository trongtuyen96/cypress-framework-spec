
import { fixCypressSpec } from '../../support/index';
import HomePage from '../../support/page/home.page';
import LoginPage from '../../support/page/login.page';

const homePage = new HomePage();
const loginPage = new LoginPage();

describe('Login feature test', () => {
    beforeEach(fixCypressSpec(__filename));

    context('Login successfully', () => {
        it('Navigate to ATWT website and wait for page load', () => {
            homePage.navigateHome();
        })

        it('Login with valid email, password', () => {
            homePage.clickLoginBtn();
            loginPage.clickLoginLink()
                .clickLoginWithEmailBtn()
                .enterEmail()
                .enterPassword()
                .clickLoginBtn();
        })

        it('Login successfully', () => {
            homePage.verifyLoginUser();
        })
    })

    context('Login failed', () => {
        it('Navigate to ATWT website and wait for page load', () => {
            homePage.navigateHome();
        })

        it('Login with invalid email, password', () => {
            homePage.clickLoginBtn();
            loginPage.clickLoginLink()
                .clickLoginWithEmailBtn()
                .login("testmail@mail.com", "wrongpassword")
                .clickLoginBtn();
        })

        it('Login failed with error message', () => {
            loginPage.verifyErrorMsg('Wrong email or password');
        })
    })
})