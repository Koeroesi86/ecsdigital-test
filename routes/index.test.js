const routes = require('./index');

jest.mock('./cars', () => ({
  add: jest.fn(),
  all: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
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

    expect(app.get).toHaveBeenCalled();
    expect(app.post).toHaveBeenCalled();
    expect(app.put).toHaveBeenCalled();
    expect(app.delete).toHaveBeenCalled();
  });
});

