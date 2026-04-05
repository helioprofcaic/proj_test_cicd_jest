// tests/unit/sum.test.js
const sum = require('../../src/services/sum');

test('deve somar dois números corretamente', () => {
  expect(sum(2, 3)).toBe(5);
});