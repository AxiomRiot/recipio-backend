const request = require('supertest');
const app = require('../src/app');
const Recipe = require('../src/models/recipeModel');

const { recipeOneId, recipeOne, setupDatabase } = require('./fixtures/data');
const { testWokRecipe } = require('./fixtures/static');

beforeEach(setupDatabase);

test('Get Recipe Test', async () => {
  
  const res = await request(app)
    .get(`/recipe/${recipeOneId}`)
    .send()
    .expect(200);

  const recipe = res.body;
  expect(recipe.title).toBe(recipeOne.title);
  expect(recipe.description).toBe(recipeOne.description);
  expect(recipe.servings).toBe(recipeOne.servings);
  expect(recipe.ingredients).toStrictEqual(recipeOne.ingredients);
  expect(recipe.steps).toStrictEqual(recipeOne.steps);
});


test('Get Recipe Invalid Id Test', async () => {
  
  await request(app)
    .get(`/recipe/12345`)
    .send()
    .expect(500);
});

test('Patch Recipe Test', async () => {
  
  const res = await request(app)
    .patch(`/recipe/${recipeOneId}`)
    .send({
      title: "New Title"
    })
    .expect(200);

  const recipe = res.body;
  expect(recipe.title).toBe("New Title");
});

test('Patch Recipe Non Supported Test', async () => {
  
  const res = await request(app)
    .patch(`/recipe/${recipeOneId}`)
    .send({
      url: "test.com"
    })
    .expect(500);
});

test('Delete Recipe Test', async () => {
  
  const res = await request(app)
    .delete(`/recipe/${recipeOneId}`)
    .send()
    .expect(201);
});

test('Delete Recipe Invalid Id Test', async () => {
  
  const res = await request(app)
    .delete(`/recipe/12345`)
    .send()
    .expect(500);
});