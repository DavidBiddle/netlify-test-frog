const fetch = require("isomorphic-fetch");

exports.handler = async (event, context) => {
    const urls = ['frog1.jpg', 'frog2.png'];
    const number = Math.floor(Math.random() * urls.length);
    const fileURL  = `https://elastic-wilson-6356ee.netlify.com/img/${urls[number]}`;

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
