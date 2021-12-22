const express = require('express');

// Create a webserver
const app = express();

// Adding jsonflex and telling the  webserver to use jsonflex
const jsonflex = require('jsonflex')({ jsonDir: '/frontend_spa/json' });
app.use(jsonflex);

// Tell the web server to serve files from the frontend folder
app.use(express.static('frontend_spa'));

// Start the web server at port 3000
app.listen(3000, () => console.log('Listening on port 3000'));

// If the server can not find a file for a url/route
// then serve index.html
app.get('*', (req, res, next) => {
  if (req.url === "/jsonflex.js") { next(); return; }
  res.sendFile(__dirname + '/frontend_spa/index.html');
});