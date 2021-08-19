var headers = {};
var cookies = [];
var requestBody = '';
var method = '';
var url = '';
var auth = '';
var requestOptions = {};
var responseObject;
var responseBody;

class APIAction {

    getResponseBody() {
        return responseBody;
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

    makeRequest(reqmethod, apiuri, body) {
        method = reqmethod;
        url = apiuri;
        requestBody = body;

        requestOptions.log = true;
        requestOptions.method = method;
        requestOptions.url = url;
        requestOptions.headers = headers;
        requestOptions.body = requestBody;
        requestOptions.auth = auth;

        cy.api(requestOptions)
            .then((resp) => {
                responseObject = resp;
                responseBody = JSON.stringify(responseObject.body);
                responseBody = JSON.parse(responseBody);
            });

        return this;
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
        if (jsonkey.includes(".")) {
            jsonKey = jsonkey.split(".");
            let tempRespondBody = responseBody;
            while (count < jsonKey.length) {
                success = regex.test(tempRespondBody[jsonKey[count]]);
                tempRespondBody = tempRespondBody[jsonKey[count]];
                count++;
            }
            cy.log("Expect " + jsonKey + " to equal " + value)
            expect(success).to.equal(true);
        }
        else {
            jsonKey = jsonkey;
            success = regex.test(responseBody[jsonKey]);
            cy.log("Expect " + jsonKey + " to equal " + value)
            expect(success).to.equal(true);
        }
        return this;
    }
}

module.exports = APIAction;