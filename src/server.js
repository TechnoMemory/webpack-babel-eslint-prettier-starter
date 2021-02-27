const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.use('/', express.static(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
  console.log('App is running at port 3000');
});
