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
    authentication: {
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

const connection = new Connection(config);
router.get('/allproducts/:keyword', cors(), function (req, res) {
    console.log("result page request");
    console.log("search for = " + req.params.keyword);
    let word = req.params.keyword;
    let result;
    connection.connect();
    connection.on("connect", err => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("It connected");
            if (word != "") {
                const request = new Request(
                    `SELECT * FROM Product WHERE Productname LIKE '%${word}%' `, (err, rowCount) => {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log(`${rowCount} row(s) returned`);
                            console.log(data);
                            result = JSON.stringify(data);
                            console.log(result)
                            console.log(Bigdata)
                            // Bigdata = JSON.stringify(Bigdata)
                            // sendR(result);
                            return res.send({ error: false, data: Bigdata, message: 'Result of rooms444' });
                        }
                    }
                );
            }
            }
        });




    connection.execSql(request);

    var counter = 1;
    const data = {};
    var Bigdata = [];

    request.on("row", columns => {
        data[counter] = {}
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
            data[counter][column.metadata.colName] = column.value;

        });
        Bigdata.push(data[counter]);
        counter += 1;

    });

    return result;
}
});