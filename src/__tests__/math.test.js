const { isPair } = require('../math.js');

describe('set of math operations', () => {
  test('is two pair', () => {
    expect(isPair(2)).toBe(true);
  });
  
  test('is five pair', () => {
    expect(isPair(5)).toBe(false);
  });
});