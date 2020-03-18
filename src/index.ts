import * as express from "express";

const bodyParser = require('body-parser')

const app = express();

const db = require("./logic/business.ts")

app.use(bodyParser.json())

app.get("/", (req, res) => res.send("Hello World!"));

app.get('/posts', db.getPosts)
app.post('/posts', db.createPost)
app.get('/posts/:id', db.getPostById)
app.put('/posts/:id', db.updatePost)
app.delete('/posts/:id', db.deletePost)

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

