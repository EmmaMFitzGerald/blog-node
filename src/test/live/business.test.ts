import { describe, it } from "mocha";
import { expect } from "chai";

import { getPosts } from "../../logic/business";

describe("Business Tests", () => {
    it("should return a series of posts", async () => {
        const rows = await getPosts();

        expect(rows.length).to.be.greaterThan(0);
    });
});


