const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h2>Hello World!<h2>
    <h4>App listening on port ${port}...</h4>
  `);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
