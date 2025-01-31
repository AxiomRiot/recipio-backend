const express = require('express');
const recipeRouter = require('./routes/recipes');

require('./data/mongoose');

const app = express();

app.use(express.json());
app.use(recipeRouter);

module.exports = app;