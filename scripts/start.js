const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');

const app = express();
const port = 3000;

app.disable('x-powered-by');
app.use(bodyParser.json());
app.set('json spaces', 2);

routes(app);

app.listen(port, () => {
  console.log(`Test app listening on port ${port}!`);
});
