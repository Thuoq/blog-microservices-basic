const express = require("express")
const {
    randomBytes
} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require("axios");
const app = express()
const posts = {}

app.use(bodyParser.json())
app.use(cors())
app.get("/posts", (req, res) => {
    res.send(posts)
})
app.get("/", (req, res) => {
    res.send("<h1>hello from posts services</h1>")
})

app.post("/posts", async (req, res) => {
    try {
        const id = randomBytes(4).toString('hex');
        const {
            title
        } = req.body
        posts[id] = {
            id,
            title
        }
        await axios.post('http://localhost:4005/event', {
            type: "PostCreated",
            data: {
                id,
                title
            }
        })
        res.status(201).send(posts[id])
    } catch (error) {

    }
})
app.post("/event", (req, res) => {
    console.log("Received Event", req.body)

    res.send({})
})
app.listen(4000, () => {
    console.log("Listening on 4000")
})