const client = require('./helpers/database.helpers.ts')

const getPosts = (request: any, response: any) => {
    client.query('SELECT * FROM blog_db', (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPostById = (request: any, response: any) => {
    const id = request.params;

    client.query('SELECT * FROM blog_db WHERE id = $1', [id], (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPost = (request: any, response: any) => {
    const { title, body, date } = request.body 

    client.query('INSERT INTO blog_db (title, body, date) VALUES ($1, $2, $3)',
    [title, body, date], (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Post added`)
    })
}

const updatePost = (request: any, response: any) => {
    const id = request.params;

    const { title, body, date } = request.body;

    client.query("UPDATE blog_db SET title=($1), body=($2), date=($3) WHERE id=($4)",
    [title, body, date, id]),
    (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(200).redirect('/posts');
    });
}

const deletePost = (request: any, response: any) => {
    const id = request.params;

    client.query("DELETE FROM blog_db WHERE id=($1)", [id]),
    (error: any, results: any) => {
        if (error) {
            throw error
        }
        response.status(200).redirect('/posts');
    });
}



// // export function getPosts(): any {
//     /*
//         1. A db connection/Client
//         2. Run the SQL query
//         3. return the result
//     */

//     // runQuery("SELECT * FROM public.blog_db");
// }

module.exports = {
    getPosts, getPostById, createPost
}