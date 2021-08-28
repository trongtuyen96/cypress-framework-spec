import APIAction from "../../support/api-action";

const baseApiUrl = Cypress.env('apiUrl');
const apiAction = new APIAction();

describe('API Car test', () => {
    before(() => {
        apiAction.setHeader('Content-Type', 'application/json');
    })
    context('GET Car', () => {
        it('Get car by model "Mc Laren 720S"', () => {
            apiAction.makeRequest('GET', baseApiUrl + '/car', '', { "model": "Mc Laren 720S" }).then(() => {
                apiAction.validateResponseCode(200);
                apiAction.validateReponseKeyValueWithPos(0, "type", "Hyper Car");
                apiAction.validateReponseKeyValueWithPos(0, "color", "Barton Blue");
                apiAction.validateReponseKeyValueWithPos(0, "speed", 320);
            })
        })

        it('Get car by id', () => {
            // Get car
            apiAction.makeRequest('GET', baseApiUrl + '/car', { "model": "Lamborghini Aventador" }).then(() => {
                apiAction.validateResponseCode(200);
                apiAction.validateReponseKeyValueWithPos(1, "color", "Orange");

                // Store id of first car
                cy.addRuntimeVariable("get_car_id", apiAction.getResponseBody(1)["_id"]);
            })

            // Get car with id
            cy.getRuntimeVariable("get_car_id").then((carId) => {
                apiAction.makeRequest('GET', baseApiUrl + '/car' + '/' + carId).then(() => {
                    apiAction.validateResponseCode(200);
                    apiAction.validateReponseKeyValue("type", "Hyper Car");
                    apiAction.validateReponseKeyValue("color", "Orange");
                    apiAction.validateReponseKeyValue("speed", 320);
                })
            })
        })
    })


    context('POST - PUT - DELETE New Car', () => {
        before(() => {
            // Get user for owner of car
            apiAction.makeRequest('GET', baseApiUrl + '/user', { "name": "Tuyen" }).then(() => {
                apiAction.validateResponseCode(200);
                apiAction.validateReponseKeyValueWithPos(1, "phoneNumber", "0123456789");

                // Store id of first user
                cy.addRuntimeVariable("user_id_for_post_car", apiAction.getResponseBody(0)["_id"]);
            })
        })

        it('POST new car', () => {
            cy.getRuntimeVariable("user_id_for_post_car").then((userId) => {
                let body = {
                    "type": "Super Bike",
                    "speed": 330,
                    "model": "BMW M1000RR",
                    "color": "White Blue Red",
                    "userID": userId
                }
                apiAction.makeRequest('POST', baseApiUrl + '/car', body).then(() => {
                    apiAction.validateResponseCode(200);
                    apiAction.validateReponseKeyValue("model", "BMW M1000RR");
                    apiAction.validateReponseKeyValue("color", "White Blue Red");
                    apiAction.validateReponseKeyValue("speed", 330);

                    // Store id 
                    cy.addRuntimeVariable("post_car_id", apiAction.getResponseBody()["_id"]);
                })
            })
        })

        it('PUT created car', () => {
            let body = {
                "speed": 340,
            }
            cy.getRuntimeVariable("post_car_id").then((carId) => {
                apiAction.makeRequest('PUT', baseApiUrl + '/car' + '/' + carId, body).then(() => {
                    apiAction.validateResponseCode(201);
                    apiAction.validateReponseKeyValue("car.speed", 340);
                })
            })
        })

        it('DELETE created car', () => {
            cy.getRuntimeVariable("post_car_id").then((carId) => {
                apiAction.makeRequest('DELETE', baseApiUrl + '/car' + '/' + carId).then(() => {
                    apiAction.validateResponseCode(200);
                })
            })
        })
    })
})
