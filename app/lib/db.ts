import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for AWS RDS SSL connection
    },
})
console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default pool;