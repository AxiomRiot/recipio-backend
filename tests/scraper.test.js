const request = require('supertest');
const app = require('../src/app');
const Recipe = require('../src/models/recipeModel');

const { recipeOneId, recipeOne, setupDatabase } = require('./fixtures/data');
const { testWokRecipe } = require('./fixtures/static');

beforeEach(setupDatabase);

test('New Wok of Life Recipe Post Test', async () => {
  
  const res = await request(app)
    .post('/recipe')
    .send({
      url: "https://thewoksoflife.com/lotus-root-pork-soup/"
    })
    .expect(201);

  // Check database
  expect(Recipe.findById(res.body._id)).not.toBeNull();

  const recipe = res.body;
  expect(recipe.title).toBe(testWokRecipe.title);
  expect(recipe.description).toBe(testWokRecipe.description);
  expect(recipe.servings).toBe(testWokRecipe.servings);
  expect(recipe.ingredients).toStrictEqual(testWokRecipe.ingredients);
  expect(recipe.steps).toStrictEqual(testWokRecipe.steps);
});