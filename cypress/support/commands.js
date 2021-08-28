// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-audit/commands';

const runtime_vars_file = 'cypress/runtime_vars.json';

Cypress.Commands.add('addRuntimeVariable', (key, value) => {

    cy.readFile(runtime_vars_file).then((obj) => {
        obj[key] = value;
        // write the merged object
        cy.writeFile(runtime_vars_file, obj);
    })
})

Cypress.Commands.add('getRuntimeVariable', (key) => {
    cy.readFile(runtime_vars_file).then((obj) => {
        return obj[key];
    })
})

Cypress.Commands.add('switchToIframe', (iframeSelector, ...elSelector) => {
    return cy
        .get(iframeSelector, { timeout: 10000 })
        .should($iframe => {
            // when passed multiple elSelector asserts each of them exists
            for (let i = 0; i < elSelector.length; i++) {
                expect($iframe.contents($iframe).find(elSelector[i] || 'body')).to.exist;
            }
        })
        .then($iframe => {
            return cy.wrap($iframe.contents().find('body'));
        })
})