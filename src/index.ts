import * as express from "express";

import {
    getPostsHandler,
    createPostHandler,
    updatePostHandler,
    deletePostHandler,
    getPostByIdHandler,
} from "./handlers/blog.handlers";
import { get } from "http";
import { getPosts } from "./logic/business";

const app = express();
app.set("view engine", "ejs");

// express.json should parse JSON into the body of the
// request for you
app.use(express.json());

// app.get("/", (req, res) => res.render("index"));
// app.get("/", (req, res) => res.render("index"));

app.get("/api/posts", getPostsHandler);
app.post("/api/posts", createPostHandler);
app.get("/api/posts/:id", getPostByIdHandler);
app.put("/api/posts/:id", updatePostHandler);
app.delete("api/posts/:id", deletePostHandler);

app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.render("posts", { posts });
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
