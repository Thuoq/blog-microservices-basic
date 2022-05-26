const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")

const {
    randomBytes
} = require("crypto")
const commentsByPostId = {}
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})
app.post("/posts/:id/comments", (req, res) => {
    const commentID = randomBytes(4).toString("hex");
    const {
        content
    } = req.body;
    const comments = commentsByPostId[req.params.id] || []
    comments.push({
        id: commentID,
        content
    })
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(commentsByPostId)
})
app.listen(process.env.PORT, () => {
    console.log("Comment services listening on 4001")
})