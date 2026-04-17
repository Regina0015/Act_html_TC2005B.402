import pg from 'pg';
const { Pool } = pg

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_DB,
        rejectUnauthorized: false,
    },
};

let pool;

export const db_connect = () => {
    if (!pool) {
        pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            ssl: { rejectUnauthorized: false }
        })
    }
    return pool;
}