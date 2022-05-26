const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")
const axios = require("axios")
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
app.post("/posts/:id/comments", async (req, res) => {
    try {
        const commentID = randomBytes(4).toString("hex");
        const {
            content
        } = req.body;
        const comments = commentsByPostId[req.params.id] || []
        comments.push({
            id: commentID,
            content,
            status: "pending"
        })
        commentsByPostId[req.params.id] = comments;
        await axios.post('http://localhost:4005/event', {
            type: "CommentCreated",
            data: {
                id: commentID,
                content,
                postId: req.params.id,
                status: "pending"
            }
        })
        res.status(201).send(commentsByPostId)
    } catch (error) {

    }


})
app.post("/event", async (req, res) => {
    console.log(req.body)
    try {
        const {type, data} = req.body;
        if (type === 'CommentModerated') {
            const {postId, id, status} = data;
            const comments = commentsByPostId[postId]
            const comment = comments.find(com => com.id === id);
            comment.status = status;
            await axios.post("http://localhost:4005/event", {
                type: 'CommentedUpdated',
                data: {
                    ...data
                }
            })
        }

        res.send({})
    } catch (error) {

    }

})
app.listen(4001, () => {
    console.log("Comment services listening on 4001")
})