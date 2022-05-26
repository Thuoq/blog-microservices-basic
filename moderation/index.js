const express = require("express")
const cors = require("cors")
const axios = require("axios")
const bodyParser = require("body-parser")
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post("/event", async (req, res) => {
    try {
        const {type, data} = req.body;
        if (type === 'CommentCreated') {
            const status = data.content.includes("orange") ? 'rejected' : 'approved';
            await axios.post("http://localhost:4005/event", {
                type: "CommentModerated",
                data: {
                    ...data,
                    status,
                }
            })
        }

    } catch (error) {

    }

})

app.listen(4003, () => {
    console.log("Listening moderation on port 4003")
})