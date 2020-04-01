const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

//Configure Connections
var connection = mysql.createConnection({
  host: 'backend-db',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'db'
});

//set up some configs for express.
const config = {
  name: 'backend',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
	logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

/////////////////
//END POINTS/////
/////////////////

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

//POST /register
app.post('/register', (req, res) => {
	var query = "insert into Users (name, password, email, type) values(\""+req.body.name+"\", \""+req.body.password+"\", \""+
	req.body.email+"\", \""+req.body.type+"\");";
	res.send(query);
	console.log(req)
	connection.query(query, function(err, result, fields){
		res.send("Now Here")
		res.end(JSON.stringify(result));
		//res.send(err);
		if(!err)
			res.status(200).send('Added the user');
	})
});







//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});