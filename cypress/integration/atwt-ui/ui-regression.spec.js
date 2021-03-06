describe('UI Regression test', () => {
    it('Compare banner image of homepage', () => {
        cy.visit('/');
        cy.xpath('//div[@data-testid="container-bg"]').toMatchSnapshot();
    })

    it('Compare banner image of post "Overriding vs Overloading"', () => {
        cy.visit('post/overriding-vs-overloading');
        cy.xpath('//img[@style="opacity: 1;"]').toMatchSnapshot();
    })

    it.skip('Compare banner image of post "SOLID"', () => {
        cy.visit('post/s-o-l-i-d-the-first-5-principles-of-object-oriented-programing');
        cy.xpath('//img[@style="opacity: 1;"]').toMatchSnapshot();
    })

    it.skip('Compare banner image of post "Java Reflection"', () => {
        cy.visit('post/java-reflection');
        cy.xpath('//img[@style="opacity: 1;"]').toMatchSnapshot();
    })
})