import APIAction from "../../support/api-action";
import { getUserSchema } from "../../support/schema/user/get-user.schema";
import { getCarSchema } from "../../support/schema/car/get-car.schema";
import { getCarIdSchema } from "../../support/schema/car/get-car-id.schema";
import { postCarSchema } from "../../support/schema/car/post-car.schema";
import { putCarSchema } from "../../support/schema/car/put-car.schema";

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
                apiAction.validateReponseKeyValue("[0].type", "Hyper Car");
                apiAction.validateReponseKeyValue("[0].color", "Barton Blue");
                apiAction.validateReponseKeyValue("[0].speed", 320);
                cy.validateSchema(getCarSchema, apiAction.getResponseBody());
            })
        })

        it('Get car by id', () => {
            // Get car
            apiAction.makeRequest('GET', baseApiUrl + '/car', { "model": "Lamborghini Aventador" }).then(() => {
                apiAction.validateResponseCode(200);
                apiAction.validateReponseKeyValue("[1].color", "Orange");
                cy.validateSchema(getCarSchema, apiAction.getResponseBody());

                // Store id of first car
                cy.addRuntimeVariable("get_car_id", apiAction.getResponseBodyValue("[1]._id"));
            })

            // Get car with id
            cy.getRuntimeVariable("get_car_id").then((carId) => {
                apiAction.makeRequest('GET', baseApiUrl + '/car' + '/' + carId).then(() => {
                    apiAction.validateResponseCode(200);
                    apiAction.validateReponseKeyValue("type", "Hyper Car");
                    apiAction.validateReponseKeyValue("color", "Orange");
                    apiAction.validateReponseKeyValue("speed", 320);
                    cy.validateSchema(getCarIdSchema, apiAction.getResponseBody());
                })
            })
        })
    })


    context('POST - PUT - DELETE New Car', () => {
        before(() => {
            // Get user for owner of car
            apiAction.makeRequest('GET', baseApiUrl + '/user', { "name": "Tuyen" }).then(() => {
                apiAction.validateResponseCode(200);
                apiAction.validateReponseKeyValue("[1].phoneNumber", "0123456789");
                cy.validateSchema(getUserSchema, apiAction.getResponseBody());

                // Store id of first user
                cy.addRuntimeVariable("user_id_for_post_car", apiAction.getResponseBodyValue("[0]._id"));
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
                    cy.validateSchema(postCarSchema, apiAction.getResponseBody());

                    // Store id 
                    cy.addRuntimeVariable("post_car_id", apiAction.getResponseBodyValue("_id"));
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
                    cy.validateSchema(putCarSchema, apiAction.getResponseBody());
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
