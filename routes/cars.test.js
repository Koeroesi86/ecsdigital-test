const sqlite3 = require('sqlite3');
const path = require('path');
const { add, all, get, update, remove } = require('./cars');

const MockStatement = {
  run: jest.fn((a, cb) => setTimeout(() => cb(null), 0)),
  finalize: jest.fn(),
};

const MockDatabase = {
  run: jest.fn((a, cb) => setTimeout(() => cb(null), 0)),
  prepare: jest.fn(() => MockStatement),
  get: jest.fn((a, b, cb) => setTimeout(() => cb(null, {}), 0)),
  all: jest.fn((a, b, cb) => setTimeout(() => cb(null, []), 0)),
};

jest.mock('uuid/v4', () => () => 'mockid');
jest.mock('sqlite3', () => ({
  Database: jest.fn(function (p, callback) {
    setTimeout(() => callback(null), 0);
    return MockDatabase;
  }),
}));

describe('The cars routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call sqlite3.Database.get', async () => {
    await get('test');

    expect(MockDatabase.get.mock.calls).toMatchSnapshot();
  });

  it('should ignore word search', async () => {
    MockDatabase.get.mockImplementationOnce((a, b, cb) => setTimeout(() => cb(null, undefined), 0));
    const result = await get('test');

    expect(result).toMatchSnapshot();
  });

  it('should handle table creation error', async () => {
    MockDatabase.run.mockImplementationOnce(jest.fn((a, cb) => setTimeout(() => cb(new Error('error')), 0)));
    try {
      await get('test');
    } catch (e) {
      return expect(e).toMatchSnapshot();
    }

    expect(1).toEqual(2);
  });

  it('should update', async () => {
    await update({
      id: 'testid',
      make: 'testmake',
      model: 'testmodel',
      colour: 'testcolour',
      year: 'testyear',
    });

    expect(MockDatabase.prepare.mock.calls).toMatchSnapshot();
    expect(MockStatement.run.mock.calls).toMatchSnapshot();
  });

  it('should call sqlite3.Database.all', async () => {
    await all();

    expect(MockDatabase.all.mock.calls).toMatchSnapshot();
  });

  it('should add', async () => {
    await add({
      id: 'testid',
      make: 'testmake',
      model: 'testmodel',
      colour: 'testcolour',
      year: 'testyear',
    });

    expect(MockStatement.run.mock.calls).toMatchSnapshot();
  });

  it('should remove', async () => {
    await remove({
      id: 'testid',
    });

    expect(MockStatement.run.mock.calls).toMatchSnapshot();
  });

  it('should not remove without id', async () => {
    try {
      await remove({});
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});

