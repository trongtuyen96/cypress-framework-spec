const responseBody = [
    {
        "_id": "5e958ae5ed1bd7000401aafc",
        "type": {
            "a": "Hyper Car A",
            "b": "Hyper Car B"
        },
        "speed": 320,
        "model": "Mc Laren 720S",
        "color": "Barton Blue",
        "userID": "5e958257bcb48a0004d62da6",
        "__v": 0
    },
    {
        "_id": "5e958b4ded1bd7000401aafd",
        "type": "Hyper Car",
        "speed": 320,
        "model": "Lamborghini Aventador",
        "color": "Orange",
        "userID": "5e958257bcb48a0004d62da6",
        "__v": 0
    }];

function validateReponseKeyValue(jsonkey, value) {
    let jsonKey;
    let regex = new RegExp(value);
    let success;
    let response = responseBody;
    if (jsonkey.includes(".")) {
        jsonKey = jsonkey.split(".");
        let count = 0;
        while (count < jsonKey.length) {
            if (jsonKey[count].includes("[")) {
                if (jsonKey[count].charAt(0) == "[") {
                    let pos = Number(jsonKey[count].substring(1, jsonKey[count].indexOf("]")));
                    response = response[pos];
                }
                else {
                    let gofirst = jsonKey[count].substring(0, jsonKey[count].indexOf("["));
                    response = response[gofirst];
                    let pos = Number(jsonKey[count].substring(jsonKey[count].indexOf("["), jsonKey[count].indexOf("]")));
                    response = response[pos];
                }
            } else {
                success = regex.test(response[jsonKey[count]]);
                response = response[jsonKey[count]];
            }
            count++;
        }
        // cy.log("Expect " + jsonKey + " to equal " + value);
        // expect(success).to.equal(true);
        console.log(success);
    }
    else {
        jsonKey = jsonkey;
        success = regex.test(response[jsonKey]);
        // cy.log("Expect " + jsonKey + " to equal " + value);
        // expect(success).to.equal(true);
        console.log(success);
    }
    return this;
}

function WithPos(position, response) {
    return response[position];
}


function validateReponseKeyValueWithPos(position, jsonkey, value) {
    let jsonKey;
    console.log(jsonkey, value);
    let regex = new RegExp(value);
    let success;
    let response = responseBody;
    if (jsonkey.includes(".")) {
        jsonKey = jsonkey.split(".");
        response = response[position];
        let count = 0;
        while (count < jsonKey.length) {
            success = regex.test(response[jsonKey[count]]);
            response = response[jsonKey[count]];
            count++;
        }
        // cy.log("Expect " + jsonKey + "of object " + position + " to equal " + value);
        // expect(success).to.equal(true);
        console.log(success);
    }
    else {
        jsonKey = jsonkey;
        success = regex.test(response[position][jsonKey]);
        // cy.log("Expect " + jsonKey + "of object " + position + " to equal " + value);
        // expect(success).to.equal(true);
        console.log(success);
    }
    return this;
}

validateReponseKeyValue("[0].type.a", "Hyper Car A");

// validateReponseKeyValueWithPos(0,"type.a", "Hyper Car A");