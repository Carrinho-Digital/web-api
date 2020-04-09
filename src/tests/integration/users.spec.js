const supertest = require('supertest');
const inmemorydb = require('./inmemorydb');
const app = require('../../app');

const server = supertest(app);

beforeAll(async () => await inmemorydb.connect());

afterAll(async () => await inmemorydb.close());

describe('POST api/v1/auth/login', () => {
  beforeEach(async () => {
    const customer = {
      phones: [
        '69981050108',
      ],
      isDeleted: false,
      name: 'Eclésio Melo Júnior',
      password: '$2a$08$My5Fu0JK1QTyL8ocaL7TOOhfX.ckRfcxP/7Pjt6YBsWoBpK8xsVKy',
      email: 'eclesiomelo.1@hotmail.com',
      document: '03854783211',
      type: 'CUSTOMER_USER',
      createdAt: '2020-03-24T22:37:11.742Z',
      updatedAt: '2020-03-25T23:12:41.646Z',
    };

    await inmemorydb.insertIn('users', customer);
  });

  afterEach(async () => inmemorydb.clearDb());

  // eslint-disable-next-line max-len
  test('When user not exists must return 404 - User cannot be found', async () => {
    const notFoundUser = {
      email: 'notfound@email.com',
      password: '123123',
    };

    const expectedMessage = {
      message: 'LOGIN_INVALID',
      errors: [
        'Email or password are not correct or user does not exists',
      ],
    };

    const loginResponse = await server
      .post('/api/v1/auth/login')
      .send(notFoundUser);

    expect(loginResponse.status).toBe(404);
    expect(loginResponse.body).toMatchObject(expectedMessage);
  });

  test('When user exists must return 200 with access token', async () => {
    const authentication = {
      email: 'eclesiomelo.1@hotmail.com',
      password: 'abcd',
    };

    const loginResponse = await server
      .post('/api/v1/auth/login')
      .send(authentication);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
  });
});
