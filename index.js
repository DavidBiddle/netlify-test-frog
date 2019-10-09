const fetch = require("isomorphic-fetch");
const fs = require("fs");

const listImages = () => {    
    console.log(__dirname);
    var path = "img";
    
    const imagePaths = fs.readdirSync(path);
    return imagePaths;
}


exports.handler = async (event, context) => {
    if (new Date().getDay() === 3) {
        const urls = listImages();
        const number = Math.floor(Math.random() * urls.length);
        // const mimetype = urls[number].includes(".jpg") ? "image/jpg" : "image/png";
        const fileURL = `https://it-is-wednesday-my-dudes.netlify.com/img/${urls[number]}`;

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
                "Content-type": image.type
            },
            body: image.toString("base64"),
            isBase64Encoded: true
        };
    } else {
        return {
            statusCode: 404,
            body: "404 wednesday not found"
        };
    }
};
