import { describe, it } from "mocha";
import { expect } from "chai";

import {
    getPostsHandler,
    createPostHandler,
    updatePostHandler,
    deletePostHandler,
    getPostByIdHandler,
} from "../../handlers/blog.handlers";

class FakeResponse {
    public statusCode: number;

    public jsonObject: any;

    public status(statusCode: number): FakeResponse {
        this.statusCode = statusCode;

        return this;
    }

    public json(jsonObject: any): FakeResponse {
        this.jsonObject = jsonObject;

        return this;
    }
}

describe("Handler Tests", () => {
    it("should return a series of posts via the handler", async () => {

        const response = new FakeResponse();

        await getPostsHandler({}, response);

        expect(response.statusCode).to.eq(200);
        expect(response.jsonObject.data.length).to.be.greaterThan(0);
    });

    it("should create a new post via the handler", async () => {

        const response = new FakeResponse();

        await createPostHandler({
            body: {
                title: "A new post",
                body: "Something",
                date: "2020-01-01",
            },
        },
        response
        );

        expect(response.statusCode).to.eq(200);
        expect(response.jsonObject.success).to.eq(true);
    });

    it("should get posts by id via the handler", async() => {

        const response = new FakeResponse();

        await getPostByIdHandler({
            params: { id: 13 }
        },
            response);
        
        expect(response.statusCode).to.eq(200)

    });


    it("should update a post via the handler", async () => {

        const response = new FakeResponse();

        await updatePostHandler({
            params: {
                id: 10
            },
            body: {
                title: "A NEWER post",
                body: "Something",
                date: "2020-01-01",
            },
        },
        response
        );
        
    
    });

    it("should delete a post via the handler", async () => {

        const response = new FakeResponse();

        await deletePostHandler(
            {
                params: {
                    id: 30 },
        },
        response
        );

    });
    
});
