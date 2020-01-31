const sqlite3 = require('sqlite3');
const path = require('path');
const connectDatabase = require('./connectDatabase');

jest.mock('sqlite3', () => ({
  Database: jest.fn((p, callback) => {
    setTimeout(() => callback(null), 0);
    return {};
  }),
}));

describe('The connectDatabase', () => {
  beforeEach(() => {
    connectDatabase.reset();
  });

  it('should call sqlite3', async () => {
    const testPath = path.resolve('example');
    await connectDatabase(testPath);

    expect(sqlite3.Database.mock.calls).toMatchSnapshot();
  });

  it('should reuse database instance', async () => {
    const testPath = path.resolve('example');

    await connectDatabase(testPath);
    await connectDatabase(testPath);

    expect(sqlite3.Database.mock.calls).toMatchSnapshot();
  });

  it('should handle failure', async () => {
    const testPath = path.resolve('example');
    sqlite3.Database.mockImplementationOnce((p, callback) => callback(new Error('test')));

    try {
      await connectDatabase(testPath);
    } catch (e) {
      return expect(e).toMatchSnapshot();
    }

    expect(1).toEqual(2);
  });
});

