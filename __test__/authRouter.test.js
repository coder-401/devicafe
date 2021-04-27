'use strict';

process.env.SECRET = "toes";

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
describe('Auth Router', () => {
  let body = {
    email: "test@test.test",
    username: "test",
    password: "test"
  }
  it('can create one', async () => {
    const response = await mockRequest.post('/signup').send(body);
    expect(response.status).toBe(200);
  });
  it('can signin with basic', async () => {
    const response = await mockRequest.post('/signin')
      .send(body);
    expect(response.status).toBe(302);
  });

});




