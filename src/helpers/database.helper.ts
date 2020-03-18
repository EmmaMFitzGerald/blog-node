// Client connection stuff...
import { Client } from "pg";

const client = new Client({
    user: "postgres",
    host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "postgres",
    port: 5432,
});

module.exports = client;

// client.connect();
// // client.query("SELECT * FROM public.blog_db;", (err: any, res: any) => {
//     client.end();



// export async function runQuery(sql: string): Promise<any> {
//     // ...

//     return undefined;
// }

