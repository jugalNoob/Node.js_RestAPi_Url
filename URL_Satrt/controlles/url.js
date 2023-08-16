const shortid = require("shortid"); // nano id start 
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {

    try {
        const body = req.body;

        if (!body.url) return res.status(400).json({ error: "url is required" }); // url is body
    
        const shortyID = shortid(); // Generating a short ID with length 8
        const urls = await URL.create({
            shortId: shortyID,
            redirectURL: body.url,
            visitHistory: [],
        });
    console.log(urls
        )
        return res.json({ id: shortyID });
    } catch (err) {
     res.status(400).json({error:"not goog url"})
        console.log(err)
    }
 
}

module.exports = {
    handleGenerateNewShortURL,
};
