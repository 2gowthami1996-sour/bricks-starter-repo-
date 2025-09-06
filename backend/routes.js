const express = require('express');
db.prepare('INSERT INTO tables (id,name,schema_json,created_at) VALUES (?,?,?,?)')
.run(id, name, JSON.stringify(schema), new Date().toISOString());
res.json({ id, name, schema });
});


// List tables
router.get('/tables', (req, res) => {
const rows = db.prepare('SELECT id,name,schema_json,created_at FROM tables').all();
res.json(rows.map(r => ({...r, schema: JSON.parse(r.schema_json)})));
});


// Add rows
router.post('/tables/:id/rows', (req, res) => {
const table_id = req.params.id;
const inputRows = Array.isArray(req.body.rows) ? req.body.rows : [req.body.row];
const stmt = db.prepare('INSERT INTO rows (id,table_id,data_json,created_at) VALUES (?,?,?,?)');
const ids = [];
inputRows.forEach(r => {
const id = uuidv4();
stmt.run(id, table_id, JSON.stringify(r), new Date().toISOString());
ids.push(id);
});
res.json({ inserted: ids.length, ids });
});


// Get rows for a table
router.get('/tables/:id/rows', (req, res) => {
const table_id = req.params.id;
const rows = db.prepare('SELECT id,data_json,created_at FROM rows WHERE table_id = ?').all(table_id);
res.json(rows.map(r => ({ id: r.id, data: JSON.parse(r.data_json), created_at: r.created_at })));
});


// Simple AI parse endpoint (STUB)
// Replace with real call to OpenAI (or other LLM). For demo, returns StudentFees if prompt contains 'student'
router.post('/ai/parse', async (req, res) => {
const prompt = (req.body.prompt || '').toLowerCase();
if (prompt.includes('student')) {
const schema = {
table_name: 'StudentFees',
schema: [
{ id: 'student_id', label: 'Student ID', type: 'string' },
{ id: 'name', label: 'Name', type: 'string' },
{ id: 'class', label: 'Class', type: 'string' },
{ id: 'fee_amount', label: 'Fee Amount', type: 'number' },
{ id: 'payment_date', label: 'Payment Date', type: 'date' },
{ id: 'paid', label: 'Paid', type: 'boolean' }
],
sample_rows: [
{ student_id: 'S100', name: 'Alice', class: '10th', fee_amount: 5000, payment_date: '2025-08-01', paid: true }
]
};
return res.json(schema);
}
// Fallback: ask user for clarification
res.json({ error: 'Could not parse prompt. Try: "Create a StudentFees table with ID, name, class, fee amount, payment date, paid"' });
});


module.exports = router;
