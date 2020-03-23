import * as express from "express";

import {
    getPostsHandler,
    createPostHandler,
    updatePostHandler,
    deletePostHandler,
    getPostByIdHandler,
} from "./handlers/blog.handlers";

import {
    getPosts,
    getPostById,
    createPost,
    deletePost,
} from "./logic/business";

const app = express();
import methodOverride = require("method-override");
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
// express.json should parse JSON into the body of the
// request for you
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.get("/posts/new", (req, res) => {
    res.render("createPost");
})

app.get("/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    const post = await getPostById(id);
    res.render("post", { post });
});

app.post("/posts", async (req, res) => {
    const { title, body } = req.body;
    const date = new Date();
    console.log(title, body, date);
    await createPost(title, body, date);

    res.redirect("/posts");
});

app.delete("/posts/:id", async (req, res) => {
    console.log(req);
    const id = Number(req.params.id);
    console.log(id);
    await deletePost(id);
    res.redirect("/posts");
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
