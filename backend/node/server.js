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
	if(err)
	{
		console.log("Cannot connect to DB!");
		console.log(err);
	}
	else
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
	return;
});

//get pharmacies
app.get('/pharmacies', (req, res) => {
	var query = "select * from Pharmacies";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
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

//Returns appointment by ID
app.get('/appointments/:id', (req, res) => {
	var query = "select * from Appointments where ID = \"" + req.params.id + "\"";
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Appointment Found With Specified ID");
				return;
			default:
				res.status(200).send(result[0]);
				return;
		}
	})
})

//Returns past appointments by patient id
app.get('/appointments/patient/past/:id', (req, res) => {
	var date = new Date();
	var query = "select * from Appointments where ID = \"" + req.params.id + "\" AND time < \"" +
		date.getFullYear + "-" + date.getMonth + "-" + date.getDay + " " +
		date.getHours + ":" + date.getMinutes + ":" + date.getSeconds;
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Past Appointments Found For Specified Patient");
				return;
			default:
				res.status(200).send(result);
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

//get appointments for a doctor patient combo
app.get('/appointments/doctor/:docID/:patientID', (req,  res) => {
	var query = "select * from Appointments where docID=\""+req.params.docID+"\" and patientID=\""+req.params.patientID+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Appointments Found For Specified Doctor Patient Combo");
				return;
			default:
				res.status(200).send(result);
				return;
		}
	})
})

//get past appointments for a doctor 
app.get('/appointments/doctor/past/:id', (req,  res) => {
	var query = "select * from Appointments where docID=\""+req.params.id+"\" and "+current_time()+" > time";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Past Appointments Found For Specified Doctor");
				return;
			default:
				res.status(200).send(result);
				return;
		}
	})
})

//get future appointments for a doctor 
app.get('/appointments/doctor/future/:id', (req,  res) => {
	var query = "select * from Appointments where docID=\""+req.params.id+"\"  and "+current_time()+" < time";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Future Appointments Found For Specified Doctor");
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

//get prescriptions given a doctor
app.get('/prescriptions/doctor/:id', (req,  res) => {
	var query = "select * from PrescriptionDetails where docID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Prescriptions For Specified Doctor");
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

//get all allergy types
app.get('/allergies', (req, res) =>{
	var query = "select * from Allergies";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get all allergies for a patient
app.get('/patient/allergies/:id', (req, res) =>{
	var query = "select * from PatientAllergies pa join Allergies a on pa.allergyID=a.ID where patientID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get all medications in inventory given pharmacy 
app.get('/medications/inventory/:id', (req,  res) => {
	var query = "select * from Inventory where pharmID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Medications In Inventory for Specified Pharmacy");
				return;
			default:
				res.status(200).send(result);
				return;
		}
	})
})

//get specific medication in inventory for given pharmacy 
app.get('/medications/inventory/:pharmID/:medID', (req,  res) => {
	var query = "select * from Inventory where pharmID=\""+req.params.pharmID+"\" and medID=\""+req.params.medID+"\"";
	
	connection.query(query, function(err, result, fields){
		switch(result.length){
			case 0:
				res.status(400).send("No Medication Found In Inventory for Given Pharmacy");
				return;
			default:
				res.status(200).send(result);
				return;
		}
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
					return;
				}
			})
		}
		
		if(shouldDelete){
			var query3 = "delete from Users where ID="+result.insertId+";";
							 
			connection.query(query3, function(err3, result3, fields3){
				res.status(status).send(message);
				return;
			})
		}
	})
});

//login
app.post('/login', (req, res) => {
	if(!(req.body.email && req.body.password)){
		res.status(400).send("Missing email or password");
		return;
	}
	
	var query = "select * from Users where email=\""+req.body.email+"\" and p"+
				"assword=\""+req.body.password+"\"";
				
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed SQL Query");
			return;
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
			return;
		})
	})
})

//creates new directions for prescriptions
app.post('/prescriptions/directions', (req,  res) => {
	if(!req.body.directions){
		res.status(400).send("Missing Directions");
		return;
	}
	
	var query = "insert into Directions(directions) values(\""+req.body.directions+"\");";
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed to Create Directions");
			return;
		}
		
		res.status(200).send(result);
		return;
	})
})

//creates new allergy type
app.post('/allergy', (req, res) => {
	if(!req.body.allergyName){
		res.status(400).send("Missing Allergy Name");
	}
	
	var query = "insert into Allergies(allergyName) values(\""+req.body.allergyName+"\");";
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed to Create Allergy");
			return;
		}
		
		res.status(200).send(result);
		return;
	})
})

//creates new patient allergy
app.post('/patient/allergy', (req, res) => {
	if(!(req.body.patientID && req.body.allergyID)){
		if(req.body.patientID)
			res.status(400).send("Missing Allergy ID");
		else
			res.status(401).send("Missing Patient ID");
		return;
	}
	
	var query = "insert into PatientAllergies(patientID, allergyID) values("+req.body.patientID+", "+req.body.allergyID+");";
	
	connection.query(query, function(err, result, fields){
		if(err){
			if(err.code == "ER_DUP_ENTRY")
				res.status(500).send("Duplicate Entry");
			else
				res.status(501).send("Failed to Create Patient Allergy");
			return;
		}
		
		res.status(200).send(result);
		return;
	})
})

//add medication to inventory given medicationID,pharmacyID, and medicationQuantity
app.post('/inventory', (req,  res) => {
	
	let medicineID = req.body.medID
	let pharmacyID = req.body.pharmID
	let inputQuantity = req.body.quantity
	con.query(`INSERT INTO Inventory (medID,pharmID,quantity) VALUES (${medicineID},${pharmacyID},${inputQuantity})`, function(err,result,fields) {
		if (err) {
			res.status(500).send("Failed to Add Medication");
		}
		res.status(200).send(result);
		return; 

	});
});

//Creates a new Prescription
app.post('/prescription', (req, res) => {
	let id = req.body.id
	let patientID = req.body.patientID
	let medID = req.body.medID
	let pharmID = req.body.pharmID
	let dir = req.body.directions
	let docID = req.body.docID
	let refill = req.body.refillEvery
	let sub = req.body.subRetriever
	let pickup = req.body.pickupPrefTime


	if (!(id && patientID && medID && pharmID && dir && docID && refill)) {
		res.status(400).send("Missing id, patientID, medID, pharmID, directions," +
						 	 " docID, OR refillEvery\n" +
							 "Optional Entry Data: subRetriever, pickupPrefTime");
		return;
	}

	if (!sub)
		sub = ""
	if (!pickup)
		pickup = ""
	
	var query = "insert into PrescriptionDetails(ID, patientID, medID, pharmID, directions, docID, needRefill, subRetriever," +
		" readyForPickup, pickupPrefTime, refillEvery) " +
		"values(" + id + ", " + patientID + ", " + medID + ", " + pharmID +
		", " + dir + ", " + docID + ", 0" + ", " + sub + ", 0, " + pickup + ", " + refill + ");";
	
	connection.query(query, function(err, result, fields){
		if(err){
			if(err.code == "ER_DUP_ENTRY")
				res.status(500).send("Duplicate Entry");
			else
				res.status(501).send("Failed to Create Prescription");
			return;
		}
		
		res.status(200).send(result);
		return;
	})
})


///////
//PUT//
///////

//update prescription directions
app.put('/prescriptions/updateDir/:id', (req, res) => {
	if (!(req.body.directions)){
		res.status(400).send("Missing Directions");
		return;
	}

	var query = "update PrescriptionDetails set directions = \"" + req.body.directions
		+ "\" where patientID=\"" + req.params.id + "\"";
	
	connection.query(query, function (err, result, fields) {
		if(err){
			res.status(500).send("Failed to Update Details");
			return;
		}
		res.status(200).send(result);
		return;
	})
})

//Change subRetriever of Prescription
app.put('/prescriptions/updateSub/:id', (req, res) => {
	if (!(req.body.name)){
		res.status(400).send("Missing Name Information");
		return;
	}

	var query = "update PrescriptionDetails set subRetriever = \"" + req.body.name
		+ "\" where patientID=\"" + req.params.id + "\"";
	connection.query(query, function (err, result, fields) {
		if(err){
			res.status(500).send("Failed to Update Sub. Retriever");
			return;
		}
		res.status(200).send(result);
		return;
	})
})

//Update Stock of a given med at a given pharmacy
app.put('/inventory/order/:pharmID/:medID', (req, res) => {
	if (!(req.body.quantity)){
		res.status(400).send("Missing Quantity");
		return;
	}

	var query = "update PrescriptionDetails set quantity = quantity + \"" + req.body.quantity
		+ "\" where pharmID=\""+req.params.pharmID+"\" and medID=\""+req.params.medID+"\"";
	connection.query(query, function (err, result, fields) {
		if(err){
			res.status(500).send("Failed to Update Inventory");
			return;
		}
		res.status(200).send(result);
		return;
	})
})

//Update Preferred Availability for Pickup
app.put('prescriptions/updatePickup/:id', (req, res) => {
	if (!(req.body.date)){
		res.status(400).send("Missing Date and Time Information");
		return;
	}
	var query = "update PrescriptionDetails set pickupPrefTime = \"" + req.body.date
		+ "\" where patientID=\"" + req.params.id + "\"";
	connection.query(query, function (err, result, fields) {
		if(err){
			res.status(500).send("Failed to Update Preferred Pickup Time.");
			return;
		}
		res.status(200).send(result);
		return;
	})
	
})

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  console.log(`${config.name} running on ${config.host}:${config.port}`);
});