const axios = require('axios');
const wordLookup = require('./wordLookup');

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

/** Mock express */
const app = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('The word lookup', () => {
  it('should call axios', async () => {
    await wordLookup('example');

    expect(axios.get).toHaveBeenCalledWith(`https://api.datamuse.com/words?sl=example`);
  });
});

