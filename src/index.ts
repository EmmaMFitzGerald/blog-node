import * as express from "express";

import {
    getPostsHandler,
    createPostHandler,
    updatePostHandler,
    deletePostHandler,
    getPostByIdHandler,
} from "./handlers/blog.handlers";

const app = express();

// express.json should parse JSON into the body of the
// request for you
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/posts", getPostsHandler);
app.post("/posts", createPostHandler);
app.get("/posts/:id", getPostByIdHandler);
app.put("/posts/:id", updatePostHandler);
app.delete("/posts/:id", deletePostHandler);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
