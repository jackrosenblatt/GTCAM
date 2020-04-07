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

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
	console.log("Cannot connect to DB!");
  console.log("Connected to the DB!");
});

/////////////////
//END POINTS/////
/////////////////

///////
//GET//
///////

//verification of connection
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

//get pharmacies
app.get('/pharmacies', (req, res) => {
	var query = "select * from Pharmacies";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
	})
})

//get specific pharmacyPref
app.get('/pharmacy/:id', (req,  res) => {
	var query = "select * from Pharmacies where ID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Pharmacy Found With Specified ID");
				return;
			case 1:
				res.status(200).send(result[0]);
				return;
			default:
				res.status(401).send("Too Many Pharmacies Found");
				return;
		}
	})
})

//get appointments for a patient
app.get('/appointments/patient/:id', (req,  res) => {
	var query = "select * from Appointments where patientID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Appointments Found For Specified Patient");
				return;
			default:
				res.status(200).send(result);
				return;
		}
	})
})

//get appointments for a doctor
app.get('/appointments/doctor/:id', (req,  res) => {
	var query = "select * from Appointments where docID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Appointments Found For Specified Doctor");
				return;
			default:
				res.status(200).send(result);
				return;
		}
	})
})

//get prescriptions to be picked up given a patient
app.get('/prescriptions/pickup/:id', (req,  res) => {
	var query = "select * from PrescriptionDetails where readyForPickup=1 and patientID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Prescriptions Ready For Pickup For Specified Patient");
				return;
			default:
				res.status(200).send(result);
				return;
		}
	})
})

//get prescriptions given a patient
app.get('/prescriptions/patient/:id', (req,  res) => {
	var query = "select * from PrescriptionDetails where patientID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Prescriptions For Specified Patient");
				return;
			default:
				res.status(200).send(result);
				return;
		}
	})
})

//get options for directions of prescriptions
app.get('/prescriptions/directions', (req,  res) => {
	var query = "select * from Directions;";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

////////
//POST//
////////

//register
app.post('/register', (req, res) => {
	if(!(req.body.name && req.body.name && req.body.password && req.body.email && req.body.type)){
		res.status(400).send("Missing User Information");
		return;
	}
	
	var query = "insert into Users (name, password, email, type) values(\""+req.body.name+"\", \""+
				req.body.password+"\", \""+ req.body.email+"\", \""+req.body.type+"\");";
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed to create user");
			return;
		}
		
		var shouldDelete = false;
		var status;
		var message;
		
		switch(parseInt(req.body.type)){
			case 1:
				if(!(req.body.notificationPref && req.body.pharmacyPref && req.body.ssn)){
					shouldDelete = true;
					message = "Missing Patient Info";
					status = 401;
				}
					
				var query2 = "insert into Patients (notificationPref, pharmac"+
							 "yPref, ssn, userID) values(\""+req.body.notificationPref+
							 "\", \""+req.body.pharmacyPref+"\", \""+
							 req.body.ssn+"\", \""+result.insertId+"\");";
				break;
			case 2:					
				var query2 = "insert into Doctors (userID) values(\""+result.insertId+"\");";
				
				break;
			case 3:
				if(!req.body.pharmID){
					shouldDelete = true;
					message = "Missing Pharmacist Info";
					status = 402;
				}
					
				var query2 = "insert into Pharmacists (pharmID, userID) values(\""+
							 req.body.pharmID+"\", \""+result.insertId+"\");";
				
				break;
		}
		
		if(!shouldDelete){
			connection.query(query2, function(err2, result2, fields2){
				if(err2){
					shouldDelete = true;
					message = "Failed to Create Typed User";
					status = 501;
				} else{
					res.status(200).send("Success of Registration");
				}
			})
		}
		
		if(shouldDelete){
			var query3 = "delete from Users where ID="+result.insertId+";";
							 
			connection.query(query3, function(err3, result3, fields3){
				res.status(status).send(message);
			})
		}
	})
});

//login
app.post('/login', (req, res) => {
	if(!(req.body.email && req.body.password)){
		res.status(400).send("Missing email or password");
	}
	
	var query = "select * from Users where email=\""+req.body.email+"\" and p"+
				"assword=\""+req.body.password+"\"";
				
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed SQL Query");
		}
		
		switch(result.length){
			case 0:
				res.status(401).send("No Users Found");
				return;
			case 1:
				break;
			default:
				res.status(402).send("Too Many Users Found");
				return;
		}
		
		var query2;
		
		switch(result[0].type){
			case 1:
				query2 = "select * from Users u join Patients p on u.ID=p.use"+
				"rID where email=\""+result[0].email+"\" and password=\""+
				result[0].password+"\"";
				break;
			case 2:
				query2 = "select * from Users u join Doctors d on u.ID=d.use"+
				"rID where email=\""+result[0].email+"\" and password=\""+
				result[0].password+"\"";
				break;
			case 3:
				query2 = "select * from Users u join Pharmacists p on u.ID=p.use"+
				"rID where email=\""+result[0].email+"\" and password=\""+
				result[0].password+"\"";
				break;
		}
		
		connection.query(query2, function(err2, result2, fields2){
			res.status(200).send(result2);
		})
	})
})

//get options for directions of prescriptions
app.post('/prescriptions/directions', (req,  res) => {
	var query = "insert into Directions(directions) values(\""+req.body.directions+"\");";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

///////
//PUT//
///////

//update prescription details
app.put('/prescriptions/update/:id', (req, res) => {
	
})

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  console.log(`${config.name} running on ${config.host}:${config.port}`);
});