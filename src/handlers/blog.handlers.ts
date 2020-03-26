// Functions to handle the requests and responses for Express
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from "../logic/business";

export const getPostsHandler = async (
    request: any,
    response: any
): Promise<void> => {
    try {
        const rows = await getPosts();
        response.status(200).json({
            success: true,
            data: rows,
        });
    } catch (err) {
        response.status(500).json({
            success: false,
            errorMessage: err.toString(),
        });
    }
};

export const getPostByIdHandler = async (
    request: any,
    response: any
): Promise<void> => {
    try {
        const id = request.params.id;
        console.log("reached her!", id)

        const rows = await getPostById(id);

        return response.status(200).json({
            data: rows,
            success: true,
        });
    } catch (err) {
        return response.status(500).json({
            success: false,
            errorMessage: err.toString(),
        });
    }
};

export const createPostHandler = async (
    request: any,
    response: any
): Promise<void> => {
    try {
        console.log(request.body);
        console.log(response);
        const { title, body } = request.body.posts;
        const date = new Date();
        const isSuccessful = await createPost(title, body, date);
        if (isSuccessful) {
            response.status(200).json({
                success: true,
                title,
                body,
            });
        } else {
            response.status(500).json({
                success: false,
            });
        }
    } catch (err) {
        response.status(500).json({
            success: false,
            errorMessage: err.toString(),
        });
    }
};

export const updatePostHandler = async (
    request: any,
    response: any
): Promise<void> => {
    try {
        const id = request.params.id;
        console.log("here")
        const { title, body, date } = request.body;
        const isSuccessful = await updatePost(id, title, body, date);
        if (isSuccessful) {
            response.status(200).json({
                success: true,
            });
        } else {
            response.status(500).json({
                success: false,
            });
        }
    } catch (err) {
        return response.status(500).json({
            success: false,
            errorMessage: err.toString(),
        });
    }
};

export const deletePostHandler = async (
    request: any,
    response: any
): Promise<void> => {
    try {
        const id = request.params.id;
        const isSuccessful = await deletePost(id);

        if (isSuccessful) {
            response.status(200).json({
                success: true,
                id,
            });
        } else {
            response.status(500).json({
                success: false,
            });
        }
    } catch (err) {
        response.status(500).json({
            success: false,
            errorMessage: err.toString(),
        });
    }
};
