const express = require('express');

// Create a webserver
const app = express();

// Adding jsonflex and telling the  webserver to use jsonflex
const jsonflex = require('jsonflex')({ jsonDir: '/frontend/json' });
app.use(jsonflex);

// Tell the web server to serve files from the frontend folder
app.use(express.static('frontend'));

// Start the web server at port 3000
app.listen(3000, () => console.log('Listening on port 3000'));

