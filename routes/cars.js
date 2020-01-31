const path = require('path');
const uuid = require('uuid/v4');
const connectDatabase = require('../utils/connectDatabase');

const dbPath = path.resolve(__dirname, '../data/db.sqlite');

const createTable = db => new Promise((resolve, reject) => {
  db.run(`CREATE TABLE IF NOT EXISTS cars(
    id TEXT PRIMARY KEY NOT NULL,
    make TEXT,
    model TEXT,
    colour TEXT,
    year TEXT
  )`, function (err) {
    if (!err) return resolve();

    reject(err);
  });
});

module.exports.add = async ({
  make,
  model,
  colour,
  year,
}) => {
  const db = await connectDatabase(dbPath);
  await createTable(db);

  const id = uuid();
  const stmt = db.prepare("INSERT INTO cars (id, make, model, colour, year) VALUES ($id, $make, $model, $colour, $year)");
  await new Promise((resolve, reject) => {
    stmt.run({
      $id: id,
      $make: make,
      $model: model,
      $colour: colour,
      $year: year,
    }, err => {
      if (!err) return resolve();

      reject(err);
    });
    stmt.finalize();
  });

  return id;
};

module.exports.update = async ({
  id,
  make,
  model,
  colour,
  year,
}) => {
  const db = await connectDatabase(dbPath);
  await createTable(db);

  const stmt = db.prepare("UPDATE cars SET make = $make, model = $model, colour = $colour, year = $year WHERE id = $id");
  await new Promise((resolve, reject) => {
    stmt.run({
      $id: id,
      $make: make,
      $model: model,
      $colour: colour,
      $year: year,
    }, err => {
      if (!err) return resolve();

      reject(err);
    });
    stmt.finalize();
  });

  return {
    id,
    make,
    model,
    colour,
    year,
  };
};

module.exports.get = async (id) => {
  const db = await connectDatabase(dbPath);
  await createTable(db);

  const result = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM cars WHERE id = $id", {
      $id: id
    }, (err, row) => {
      if (!err) return resolve(row);

      reject(err);
    });
  });

  return result;
};

module.exports.all = async () => {
  const db = await connectDatabase(dbPath);
  await createTable(db);

  const result = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM cars WHERE 1", {}, function (err, rows) {
      if (!err) return resolve(rows);

      reject(err);
    });
  });

  return result;
};
