const Database = require('better-sqlite3');
const db = new Database('data.db');


// Initialize schema
db.exec(`
CREATE TABLE IF NOT EXISTS tables (
id TEXT PRIMARY KEY,
name TEXT,
schema_json TEXT,
created_at TEXT
);


CREATE TABLE IF NOT EXISTS rows (
id TEXT PRIMARY KEY,
table_id TEXT,
data_json TEXT,
created_at TEXT
);
`);


module.exports = db;
