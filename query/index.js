const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()
const posts = {}
app.use(bodyParser.json())
app.use(cors())
app.get("/posts", (req, res) => {
    res.send(posts)
})

app.post("/event", (req, res) => {
    const {type, data} = req.body;
    console.log(data)
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }
    if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts[postId]
        post.comments.push({id, content, status})
    }
    if (type === 'CommentedUpdated') {
        const {id, content, postId, status} = data;
        const post = posts[postId]
        const comment = post.comments.find(comm => comm.id === id);
        comment.status = status;
        comment.content = content;

    }
    res.send({})
})
app.listen(4002, () => {
    console.log("Listening on port 4002 at query")
})