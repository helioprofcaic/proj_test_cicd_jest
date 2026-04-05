// tests/unit/app.test.js
const request = require('supertest');
const app = require('../../src/app');

test('GET /status deve retornar ok', async () => {
  const res = await request(app).get('/status');

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('ok');
});
