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
        const { title, body, date } = request.body;

        const isSuccessful = await createPost(title, body, date);

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
