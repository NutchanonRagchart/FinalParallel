const path = require("path");
const express = require("express");
const app = express();
/* Use Router object to handle routes */
const router = express.Router();
const { Connection, Request } = require("tedious");

const config = {
    authentication:{
    options: {
        userName: "shibalover", 
        password: "LastPro12345"
    },
    type: "default"
},
server: "shibarenger.database.window.net",
options: {
    database: "shibalover ",
    encrypt: true
}
};

const connection = new Connection(config);

connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

connection.connect();

app.use("/", router); // Register the router
app.use(express.static(path.join(__dirname, '/asset')));
// Handle GET: Display myform.html
router.get("/", function (req, res) {
    console.log("Home page request");
    res.sendFile(path.join(__dirname + '/asset/homepage.html'));
});
// Server running on the port: 3030
app.listen(3040, function () {
    console.log("Server listening at Port 3040");
});