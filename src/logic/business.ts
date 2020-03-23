import { runQuery } from "../helpers/database.helper";

export const getPosts = async (): Promise<any> => {
    return runQuery("SELECT * FROM blog_db");
};

// export const getPostById = async (
//     request: any,
//     response: any
// ): Promise<any> => {
//     const id = request.params;

//     const rows = await runQuery("SELECT * FROM blog_db WHERE id = $1", [id]);

//     response.status(200).json(rows);
// };

export const getPostById = async (id: number): Promise<any> => {
    return runQuery("SELECT * FROM blog_db WHERE id = $1", [id]);
};

export const createPost = async (
    title: string,
    body: string,
    date: Date
): Promise<boolean> => {
    try {
        await runQuery(
            "INSERT INTO blog_db (title, body, date) VALUES ($1, $2, $3)",
            [title, body, date]
        );

        return true;
    } catch (err) {
        return false;
    }
};

export const updatePost = async (
    id: number,
    title: string,
    body: string,
    date: Date
): Promise<boolean> => {
    try {
        await runQuery(
            "UPDATE blog_db SET title=($1), body=($2), date=($3) WHERE id=($4)",
            [title, body, date, id]
        );

        return true;
    } catch (err) {
        return false;
    }
};

// export const updatePost = async (request: any, response: any): Promise<any> => {
//     const id = request.params;

//     // request.body is null at this point:
//     const { title, body, date } = request.body;

//     const rows = await runQuery(
//         "UPDATE blog_db SET title=($1), body=($2), date=($3) WHERE id=($4)",
//         [title, body, date, id]
//     );

//     response.status(200).json(rows);
// };

export const deletePost = async (id: number): Promise<any> => {
    try {
        await runQuery("DELETE FROM blog_db WHERE id=($1)", [id]);

        return true;
    } catch (err) {
        return false;
    }
};

// export const deletePost = async (request: any, response: any): Promise<any> => {
//     const id = request.params;

//     await runQuery("DELETE FROM blog_db WHERE id=($1)", [id]);

//     response.status(200).redirect("/posts");
// };
