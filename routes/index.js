const { add, all, get, update } = require('./cars');

module.exports = app => {
  app.get('/cars', async (req, res) => {
    try {
      const cars = await all();
      res.json(cars);
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'something is wrong' });
    }
  });

  app.post('/cars', async (req, res) => {
    try {
      const data = req.body;
      const id = await add(data);

      res.json({ ...data, id });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'something is wrong' });
    }
  });

  app.get('/cars/:id', async (req, res) => {
    try {
      const car = await get(req.params.id);
      if (car) res.json(car);
      else res.sendStatus(404);
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'something is wrong' });
    }
  });

  app.put('/cars/:id', async (req, res) => {
    try {
      const car = await update({
        id: req.params.id,
        ...req.body,
      });
      res.json(car);
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'something is wrong' });
    }
  });
};
