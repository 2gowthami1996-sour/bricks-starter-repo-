export async function parsePrompt(prompt: string) {
const res = await fetch('http://localhost:4000/api/ai/parse', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ prompt })
});
return res.json();
}


export async function createTable(name: string, schema: any) {
const res = await fetch('http://localhost:4000/api/tables', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, schema })
});
return res.json();
}


export async function getTables() {
const res = await fetch('http://localhost:4000/api/tables');
return res.json();
}


export async function getRows(tableId: string) {
const res = await fetch(`http://localhost:4000/api/tables/${tableId}/rows`);
return res.json();
}


export async function addRows(tableId: string, rows: any[]) {
const res = await fetch(`http://localhost:4000/api/tables/${tableId}/rows`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ rows })
});
return res.json();
}
