const supertest = require('supertest');

const app = require('../../app');
const redisManager = require('../../lib/redis');

const redisMockup = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

redisManager.setRedis(redisMockup);

app.start();

const server = supertest(app.server);

test('GET /hello', async () => {
  const expectedResponse = {
    message: 'Hello World',
  };

  const helloResponse = await server.get('/hello');

  expect(helloResponse.status).toBe(200);
  expect(helloResponse.body).toMatchObject(expectedResponse);
});
