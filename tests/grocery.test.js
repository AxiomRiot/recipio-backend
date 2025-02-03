const request = require('supertest');
const app = require('../src/app');

const { recipeOneId, recipeOne, setupDatabase } = require('./fixtures/data');

beforeEach(setupDatabase);

test('Get Grocery List Test', async () => {
  
  const res = await request(app)
    .get(`/groceryList`)
    .send({
      recipes: [ recipeOneId ]
    })
    .expect(200);
});