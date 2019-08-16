const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const server = express();

mongoose.connect('mongodb+srv://joao:senha@cluster0-biv0k.mongodb.net/Omini?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(routes);
server.use(express.json()); 

server.listen(3333);