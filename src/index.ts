import * as express from "express";
import * as path from "path";

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
    updatePost,
} from "./logic/business";

const app = express();
import methodOverride = require("method-override");
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

const staticDir = path.join(__dirname, "../public");
console.log(`Static direction is: ${staticDir}`);

app.use(express.static(staticDir));
// app.use('/public', express.static('public'));
// app.use(express.static("public"));
// express.json should parse JSON into the body of the
// request for you
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import dateFormat = require('dateformat');
// app.get("/", (req, res) => res.render("index"));
// app.get("/", (req, res) => res.render("index"));

app.get("/api/posts", getPostsHandler);

// Here
// app.post("/api/posts", createPostHandler);

app.post("/api/posts", createPostHandler);
app.delete("/api/posts/:id", deletePostHandler);

app.get("/api/posts/:id", getPostByIdHandler);
app.put("/api/posts/:id", updatePostHandler);

app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    // res.json(posts); giving headers error cause rendering twice
    res.render("posts", { posts });
});

app.get("/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    const post = await getPostById(id);
    res.render("post", { post });
});

app.post("/posts", async (req, res) => {
    const { title, body } = req.body.posts;
    console.log(req.body.posts)
    const date = new Date();
    const post = await createPost(title, body, date);
    console.log(post)
    // res.redirect("/posts");
    res.render("posts", { post });
});

app.delete("/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    await deletePost(id);
    res.redirect("/posts");
});

app.put("/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { title, body } = req.body;
    const date = new Date();
    await updatePost(id, title, body, date);

    res.redirect("/posts");
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
