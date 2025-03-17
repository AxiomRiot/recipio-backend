const express = require('express');
const cors = require('cors');

const recipeRouter = require('./routes/recipes');
const groceryRouter = require('./routes/grocery');

require('./data/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(recipeRouter);
app.use(groceryRouter);

module.exports = app;