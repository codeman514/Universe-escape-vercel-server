import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  try {
    const {query} = req.body;
    const result = await pool.query(query);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
