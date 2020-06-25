const fetch = require("isomorphic-fetch");

const getURL = (urls, number) =>{
    const today = new Date();
    if ((today.getDate === 30 || today.getDate === 31) && today.getMonth === 9){
        return 'specialimg/halloween.jpg';
    }else{
        return urls[number];
    }
}

exports.handler = async (event, context) => {
    if (new Date().getDay() === 3) {
        const urls = [
            "img/frog1.jpg",
            "img/frog2.png",
            "img/frog3.jpg",
            "img/frog4.png",
            "img/frog5.jpg",
            "img/frog6.png",
            "img/frog7.jpg",
            "img/frog8.png",
            "img/frog9.jpg",
            "img/frog10.png",
            "img/frog11.jpg",
            "img/frog12.jpg",
            "img/frog13.jpg",
            "img/frog14.jpg",
            "img/frog15.png",
            "img/frog16.png",
            "img/frog17.png"
        ];
        const number = Math.floor(Math.random() * urls.length);
        const url = getURL(urls,number);
        // const mimetype = urls[number].includes(".jpg") ? "image/jpg" : "image/png";
        const fileURL = `https://it-is-wednesday-my-dudes.netlify.com/${url}`;

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
