export const getUserSchema = {
    $id: "getUserSchema",
    "type": "array",
    "items": [
        {
            "type": "object",
            "properties": {
                "_id": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "birthDate": {
                    "type": "string"
                },
                "phoneNumber": {
                    "type": "string"
                },
                "__v": {
                    "type": "integer"
                }
            },
            "required": [
                "_id",
                "email",
                "password",
                "name",
                "birthDate",
                "phoneNumber",
                "__v"
            ]
        }
    ]
};