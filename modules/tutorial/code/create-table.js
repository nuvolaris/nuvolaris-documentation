const { Client } = require('pg')

async function main(args) {
    const client = new Client({ connectionString: args.dbUri });

    const createTable = `
    CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY,
        name varchar(50),
        email varchar(50),
        phone varchar(50),
        message varchar(300)
    );
    `
    // Connect to database server
    await client.connect();

    try {
        await client.query(createTable)
    } catch (e) {
        console.log(e);
        throw e
    } finally {
        client.end();
    }
}