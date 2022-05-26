const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()

app.use(bodyParser.json())

app.post("/event", async (req, res) => {
    try {


        const event = req.body;
        console.log(event)
        await axios.post("http://localhost:4000/event", event)
        await axios.post("http://localhost:4001/event", event)
        await axios.post("http://localhost:4002/event", event)
        await axios.post("http://localhost:4003/event", event)
        res.send({status: 'OK'})
    } catch (error) {
    }


})

app.listen(4005, () => {
    console.log("Listening on 4005")
})