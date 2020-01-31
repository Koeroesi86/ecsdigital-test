const routes = require('./index');

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock('./cars', () => ({
  add: jest.fn(() => Promise.resolve()),
  all: jest.fn(() => Promise.resolve([])),
  get: jest.fn(() => Promise.resolve({})),
  update: jest.fn(() => Promise.resolve()),
  remove: jest.fn(() => Promise.resolve()),
}));

/** Mock express */
const app = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('The routes', () => {
  it('should register routes', () => {
    routes(app);

    expect(app.get.mock.calls).toMatchSnapshot();
    expect(app.post.mock.calls).toMatchSnapshot();
    expect(app.put.mock.calls).toMatchSnapshot();
    expect(app.delete.mock.calls).toMatchSnapshot();
  });
});

