import React, { useEffect, useState } from 'react'
alert('Table created: ' + res.id)
} else {
alert(parsed.error || 'Parse failed')
}
}


async function selectTable(t: any) {
setSelectedTable(t)
const r = await getRows(t.id)
setRows(r)
}


async function addSampleRow() {
if (!selectedTable) return alert('Select a table first')
const sample = {} as any
selectedTable.schema.forEach((c: any) => sample[c.id] = c.type === 'number' ? 0 : c.type === 'boolean' ? false : '')
await addRows(selectedTable.id, [sample])
const r = await getRows(selectedTable.id)
setRows(r)
}


return (
<div style={{display:'flex',height:'100vh'}}>
<div style={{width:300,padding:20,borderRight:'1px solid #eee'}}>
<h3>AI Chat / Create</h3>
<textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={6} style={{width:'100%'}} />
<button onClick={handleParse}>Create Table from Prompt</button>


<hr />
<h4>Tables</h4>
<ul>
{tables.map(t => (
<li key={t.id}>
<button onClick={()=>selectTable(t)}>{t.name}</button>
</li>
))}
</ul>
</div>
<div style={{flex:1,padding:20}}>
<h2>Grid / Table View</h2>
{selectedTable ? (
<div>
<h3>{selectedTable.name}</h3>
<button onClick={addSampleRow}>Add Empty Row</button>
<table style={{width:'100%',marginTop:10,borderCollapse:'collapse'}}>
<thead>
<tr>
{selectedTable.schema.map((c:any)=>(<th key={c.id} style={{border:'1px solid #ddd',padding:8}}>{c.label}</th>))}
</tr>
</thead>
<tbody>
{rows.map(r=> (
<tr key={r.id}>
{selectedTable.schema.map((c:any)=>(<td style={{border:'1px solid #eee',padding:6}}>{String(r.data[c.id] ?? '')}</td>))}
</tr>
))}
</tbody>
</table>
</div>
) : <div>Select a table to view rows</div>}
</div>
</div>
)
}
