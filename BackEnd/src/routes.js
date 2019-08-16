const express = require('express');
const devController = require('./controllers/devController');
const likeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');

const routes = express.Router();

routes.get('/dev', devController.index);
routes.get('/', (req, res) => {
    res.send(`Ola' ${req.query.name}`);
});

routes.post('/dev', devController.store);
routes.post('/dev/:devsId/likes', likeController.store);
routes.post('/dev/:devsId/dislikes', dislikeController.store);

module.exports = routes;
