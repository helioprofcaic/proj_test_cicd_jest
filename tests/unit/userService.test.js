// tests/unit/userService.test.js
jest.mock('axios');

const axios = require('axios');
const { getUser } = require('../../src/services/userService');

test('deve retornar usuário mockado', async () => {
  axios.get.mockResolvedValue({
    data: { id: 1, nome: 'João' }
  });

  const user = await getUser(1);

  expect(user.nome).toBe('João');
});