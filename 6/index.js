//dependency - express application generator
const express = require('express')
//initialize
const app = express();
//request - resource
app.get('/', (req, res) => {
//string
  res.send('Hello World!')
});
//listen on port 8000
app.listen(8000, () => {
//message
  console.log('Example app listening on port 8000!')
});
