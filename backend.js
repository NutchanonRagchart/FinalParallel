var cors = require('cors');
var bp = require('body-parser');
const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
/* Use Router object to handle routes */
const router = express.Router();
const { Connection, Request } = require("tedious");
router.use(cors());
router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));
dotenv.config();

const config = {
    authentication:{
    options: {
        userName: process.env.MYSQL_USERNAME, 
        password: process.env.MYSQL_PASSWORD,
    },
    type: "default"
},
server: process.env.MYSQL_HOST,
options: {
    database: process.env.MYSQL_DATABASE,
    encrypt: true
}
};

var connection = new Connection(config);

connection.on('connect', (err) => {
  if (err) console.log(err.message);
  console.log(`Database connected: ${process.env.MYSQL_HOST}`);
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


route.get('/allproducts/:keyword', cors(),function (req, res) {
    console.log("result page request");
    console.log("search for = " + req.params.keyword);
    let word = req.params.keyword;
    if (word != "") {
        connection.query(`SELECT * FROM product WHERE Pname like '%${word}%'`, function (error, results) {
            if (error) throw error;
            else {


                if (results.length > 0) {
                    return res.send({
                        error: false,
                        data: results,
                        message: 'Product list'
                    });
                } else {
                    connection.query(`SELECT * FROM product`, function (error, results) {
                        if (error) throw error;
                        else {
                            return res.send({
                                error: false,
                                data: results,
                                message: 'Product list'
                            });
                        }
                    })
                }
            }

        })
    }

});

