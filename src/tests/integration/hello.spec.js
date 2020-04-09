const supertest = require('supertest');
const app = require('../../app');

const server = supertest(app);

test('GET /hello', async () => {
  const expectedResponse = {
    message: 'Hello World',
  };

  const helloResponse = await server.get('/hello');

  expect(helloResponse.status).toBe(200);
  expect(helloResponse.body).toMatchObject(expectedResponse);
});
