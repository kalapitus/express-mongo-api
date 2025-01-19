//import libraries
const http = require('http');
const app = require('./app');

//configure server port
const port = process.env.PORT || 3000;

//create server
const server = http.createServer(app);

//start server
server.listen(port);