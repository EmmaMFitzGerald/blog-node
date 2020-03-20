// Client connection stuff...
import { Client } from "pg";
import { runInNewContext } from "vm";

function getClient(): Client {
    const client = new Client({
        user: "postgres",
        host: "database-1.cvqcoj8kv6dg.us-east-1.rds.amazonaws.com",
        database: "postgres",
        password: "postgres",
        port: 5432,
    });

    return client;
}

// eslint-disable-next-line import/prefer-default-export
export async function runQuery(
    sql: string,
    values: any[] = undefined
): Promise<any> {
    const client = getClient();

    try {
        client.connect();
        const result = await client.query(sql, values);

        return result.rows;
    } catch (err) {
    
        console.error(err);

        return undefined;
    } finally {
        client.end();
    }
}
