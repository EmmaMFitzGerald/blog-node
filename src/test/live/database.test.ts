import { Pool, Client } from "pg";

import { describe, it } from "mocha";
import { expect } from "chai";

/*
    1. Test the db returns a single value
    2. Test the db returns a value from the table
*/

describe("Database Tests", () => {

    it("should delete data from table", (done) => {
        const client = new Client({
            user: "postgres",
            host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
            database: "postgres",
            password: "postgres",
            port: 5432,
        });

        client.connect();
        client.query("DELETE FROM blog_db WHERE id=1", (err: any, res: any) => {
            client.end();
            console.log(res)
            expect().to.equal("2nd Test");

            done();
        });
    });   

    it("should return 1", (done) => {
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

    it("should return some data from a table", (done) => {
        const client = new Client({
            user: "postgres",
            host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
            database: "postgres",
            password: "postgres",
            port: 5432,
        });

        client.connect();
        client.query("SELECT * FROM public.blog_db;", (err: any, res: any) => {
            client.end();

            expect(res.rows[0].title).to.equal("2nd Test");

            done();
        });
    });    

    it("should return all posts from a table", (done) => {
        const client = new Client({
            user: "postgres",
            host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
            database: "postgres",
            password: "postgres",
            port: 5432,
        });

        client.connect();
        client.query("SELECT * FROM blog_db;", (err: any, res: any) => {
            client.end();

            expect(res.rows[0].title).to.equal("2nd Test");
            console.log(res.rows)
            done();
        });
    });    

    it("should return posts from a table based on id", (done) => {
        const client = new Client({
            user: "postgres",
            host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
            database: "postgres",
            password: "postgres",
            port: 5432,
        });

        client.connect();
        client.query("SELECT * FROM blog_db WHERE id = 1;", (err: any, res: any) => {
            client.end();
            console.log(res.rows)
            expect(res.rows[0].title).to.equal("2nd Test");
            
            console.log(res.rows)
            done();
        });
    });  

    it("should update a post", (done) => {
        const client = new Client({
            user: "postgres",
            host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
            database: "postgres",
            password: "postgres",
            port: 5432,
        });

        client.connect();
        client.query("UPDATE blog_db SET title='NEW TITLE', body='NEW BODY', date='2020-10-10' WHERE id=10", 
        (err: any, res: any) => {
            client.end();
            console.log(res)
            const row = res.rows.pop()
            expect(row.title).to.equal("NEW TITLE");
            console.log(res.rows)
            done();
        });
    });   

    it("should add a post to the table", (done) => {
        const client = new Client({
            user: "postgres",
            host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
            database: "postgres",
            password: "postgres",
            port: 5432,
        });

        client.connect();
        client.query("INSERT INTO blog_db (title, body, date) VALUES ('2nd Test', '2nd Body Test', '2010-01-01')", 
        (err: any, res: any) => {
            client.end();
            console.log(res.rows);
            // const row = res.rows.pop();

            // expect(row.title).to.equal("2nd Test");
            // console.log(res.rows)
            done();
        });
    });     

});
