export const putCarSchema = {
    $id: "putCarSchema",
    "type": "object",
    "properties": {
        "car": {
            "type": "object",
            "properties": {
                "_id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "speed": {
                    "type": "integer"
                },
                "model": {
                    "type": "string"
                },
                "color": {
                    "type": "string"
                },
                "userID": {
                    "type": "string"
                },
                "__v": {
                    "type": "integer"
                }
            },
            "required": [
                "_id",
                "type",
                "speed",
                "model",
                "color",
                "userID",
                "__v"
            ]
        }
    },
    "required": [
        "car"
    ]
};