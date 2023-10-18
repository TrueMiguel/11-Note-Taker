// adding the required items

const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// need to add a const for api

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)

app.use(express.static('public'));

// setting up GET for '/' as the home page. 
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// setting up GET '/notes' route
app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// setting up GET '*' as the fallback going to the home page
app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html')),
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);