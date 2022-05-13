const app = require('./server');

// Setup Server
const port = 1111;
const server = app.listen(port, listening);

function listening() {
  console.log("Yay! The server is running!");
  console.log(`Running on localhost: ${port}`);
}
  
