var headers = {};
var cookies = [];
var requestBody = '';
var method = '';
var url = '';
var auth = '';
var qs = '';
var requestOptions = {};
var responseObject;
var responseBody;

class APIAction {

    getResponseBody(pos) {
        return pos == undefined ? reponseBOdy : responseBody[pos];
    }

    setHeader(headerName, headerValue) {
        let valuesArray = [];
        if (headers[headerName]) {
            valuesArray = headers[headerName].split(',');
        }
        valuesArray.push(headerValue);
        headers[headerName] = valuesArray.join(',');
        return this;
    }

    setBasicAuth(username, password) {
        auth = { "username": username, "password": password }
    }

    setCookie(cookie) {
        cookies.push(cookie);
        return this;
    }

    makeRequest(reqmethod, apiuri, body, query) {
        method = reqmethod;
        url = apiuri;
        requestBody = body;
        qs = query;

        requestOptions.log = true;
        requestOptions.method = method;
        requestOptions.url = url;
        requestOptions.headers = headers;
        requestOptions.body = requestBody;
        requestOptions.auth = auth;
        requestOptions.qs = qs;

        return cy.api(requestOptions)
            .then((resp) => {
                responseObject = resp;
                responseBody = JSON.stringify(responseObject.body);
                responseBody = JSON.parse(responseBody);
            });
    }

    validateResponseCode(responseCode) {
        expect(responseCode).to.equal(responseObject.status);
        return this;
    }

    validateReponseKeyValue(jsonkey, value) {
        let jsonKey;
        console.log(jsonkey, value);
        let regex = new RegExp(value);
        let success;
        let response = responseBody;
        if (jsonkey.includes(".")) {
            jsonKey = jsonkey.split(".");
            while (count < jsonKey.length) {
                success = regex.test(response[jsonKey[count]]);
                response = response[jsonKey[count]];
                count++;
            }
            cy.log("Expect " + jsonKey + " to equal " + value);
            expect(success).to.equal(true);
        }
        else {
            jsonKey = jsonkey;
            success = regex.test(response[jsonKey]);
            cy.log("Expect " + jsonKey + " to equal " + value);
            expect(success).to.equal(true);
        }
        return this;
    }

    validateReponseKeyValueWithPos(position, jsonkey, value) {
        let jsonKey;
        console.log(jsonkey, value);
        let regex = new RegExp(value);
        let success;
        let response = responseBody;
        if (jsonkey.includes(".")) {
            jsonKey = jsonkey.split(".");
            let response = response[position];
            while (count < jsonKey.length) {
                success = regex.test(response[jsonKey[count]]);
                response = response[jsonKey[count]];
                count++;
            }
            cy.log("Expect " + jsonKey + "of object " + position + " to equal " + value);
            expect(success).to.equal(true);
        }
        else {
            jsonKey = jsonkey;
            success = regex.test(response[position][jsonKey]);
            cy.log("Expect " + jsonKey + "of object " + position + " to equal " + value);
            expect(success).to.equal(true);
        }
        return this;
    }
}

module.exports = APIAction;