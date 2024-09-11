const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const fs = require('fs');

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./views/css'))
app.use(express.static('./views'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'main.html')); 
});

app.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname,'views', 'board.html'));
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

