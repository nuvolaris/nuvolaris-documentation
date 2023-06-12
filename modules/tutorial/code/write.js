const { Client } = require('pg')

async function main(args) {
    const client = new Client({ connectionString: args.dbUri });

    // Connect to database server
    await client.connect();

    const { name, email, phone, message } = args

    try {
        await client.query(
            'INSERT INTO nuvolaris_table(name,email,phone,message) VALUES($1,$2,$3,$4)',
            [name, email, phone, message]
        )
    } catch (e) {
        console.log(e);
        throw e
    } finally {
        client.end();
    }
}