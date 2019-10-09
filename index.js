const fetch = require("isomorphic-fetch");

exports.handler = async (event, context) => {
    const fileURL  = "/img/frog.jpg"

    let image;
    try {
        const result = await fetch(fileURL);
        image = await result.buffer();
    } catch (error) {
        console.log("error", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };
    }

    return {
        statusCode: 200,
        headers: {
            "Content-type": "image/jpeg"
        },
        body: image.toString("base64"),
        isBase64Encoded: true
    };
};
