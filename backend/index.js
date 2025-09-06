const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use('/api', routes);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Backend running on', port));
