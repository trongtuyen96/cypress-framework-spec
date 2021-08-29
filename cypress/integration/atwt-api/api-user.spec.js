import APIAction from "../../support/api-action";

const baseApiUrl = Cypress.env('apiUrl');
const apiAction = new APIAction();

describe('API User test', () => {
    before(() => {
        apiAction.setHeader('Content-Type', 'application/json');
    })

    context('GET User', () => {
        it('Get user by name "Tuyen"', () => {
            apiAction.makeRequest('GET', baseApiUrl + '/user', '', { "name": "Tuyen" }).then(() => {
                apiAction.validateResponseCode(200);
                apiAction.validateReponseKeyValue("[0].name", "Tuyen");
                apiAction.validateReponseKeyValue("[0].phoneNumber", "0123456789");
                apiAction.validateReponseKeyValue("[0].email", "trongtuyen96@gmail.com");
            })
        })

        it('Get user by id', () => {
            // Get user
            apiAction.makeRequest('GET', baseApiUrl + '/user', { "name": "Tuyen" }).then(() => {
                apiAction.validateResponseCode(200);
                apiAction.validateReponseKeyValue("[1].phoneNumber", "0123456789");

                // Store id of second user
                cy.addRuntimeVariable("get_user_id", apiAction.getResponseBodyValue("[1]._id"));
            })

            // Get user with id
            cy.getRuntimeVariable("get_user_id").then((userId) => {
                apiAction.makeRequest('GET', baseApiUrl + '/user' + '/' + userId).then(() => {
                    apiAction.validateResponseCode(200);
                    apiAction.validateReponseKeyValue('name', 'ATWT admin');
                    apiAction.validateReponseKeyValue('phoneNumber', '0123456789');
                    apiAction.validateReponseKeyValue('email', 'atwt@gmail.com');
                })
            })
        })
    })
})
