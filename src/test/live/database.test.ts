import { Client } from "pg";

import { describe, it } from "mocha";
import { expect } from "chai";

import { updatePost } from "../../logic/business";

/*
    1. Test the db returns a single value
    2. Test the db returns a value from the table
*/

describe("Database Tests", () => {
    it("should return 1", done => {
        const client = new Client({
            user: "postgres",
            host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
            database: "postgres",
            password: "postgres",
            port: 5432,
        });

        client.connect();
        client.query("SELECT 1 AS value;", (err: any, res: any) => {

            client.end();

            expect(res.rows.length).to.equal(1);

            console.log(res.rows[0].value);
            expect(res.rows[0].value).to.equal(1);
            done();
        });
    });
});
