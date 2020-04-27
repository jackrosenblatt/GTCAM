const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

//Configure Connections
var connection = mysql.createPool({
  host: 'backend-db',
  port: '3306',
  user: 'manager',
  password: 'Password',
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

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Attempting to connect to the database.
connection.getConnection(function (err) {
	if (err)
		console.log("Cannot connect to DB!");
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
		res.status(200).send(result[0]);
		return;
	})
})

//Returns appointment by ID
app.get('/appointments/:id', (req, res) => {
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.ID = \"" + req.params.id + "\"";
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

//get appointments for a patient
app.get('/appointments/patient/:id', (req,  res) => {
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.patientID="+req.params.id;
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//Returns past appointments by patient id
app.get('/appointments/patient/past/:id', (req, res) => {
	var date = new Date();
	dateStr = date.getYear() + 1900
	+ '-'
	+ ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	+ '-' + date.getDate()
	+ ' ' + date.getHours()
	+ ':' + ((date.getMinutes() < 10) ? '0' + (date.getMinutes()) : date.getMinutes())
	+ ':' + ((date.getSeconds() < 10) ? '0' + (date.getSeconds()) : date.getSeconds());
	
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.patientID="+req.params.id+" and \""+dateStr+"\" > a.time";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get appointments for a patient on a given day
app.get('/appointments/patient/specificDate/:id/:date', (req,res) =>{
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.patientID="+req.params.id+" and LEFT(a.time, 10)=LEFT(\""+req.params.date+"\", 10)";
	
	connection.query(query,function(err,result,fields){
		res.status(200).send(result);
		return;
	})

})

//get appointments for a doctor
app.get('/appointments/doctor/:id', (req,  res) => {
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.docID="+req.params.id;
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get appointments for a doctor on a given day
app.get('/appointments/doctor/specificDate/:id/:date', (req,res) =>{
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.docID="+req.params.id+" and LEFT(a.time, 10)=LEFT(\""+req.params.date+"\", 10)";
	
	connection.query(query,function(err,result,fields){
		res.status(200).send(result);
		return;
	})
})

//get past appointments for a doctor 
app.get('/appointments/doctor/past/:id', (req,  res) => {
	var date = new Date();
	dateStr = date.getYear() + 1900
	+ '-'
	+ ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	+ '-' + date.getDate()
	+ ' ' + date.getHours()
	+ ':' + ((date.getMinutes() < 10) ? '0' + (date.getMinutes()) : date.getMinutes())
	+ ':' + ((date.getSeconds() < 10) ? '0' + (date.getSeconds()) : date.getSeconds());
	
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.docID="+req.params.id+" and \""+dateStr+"\" > a.time";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get future appointments for a doctor 
app.get('/appointments/doctor/future/:id', (req,  res) => {
	var date = new Date();
	dateStr = date.getYear() + 1900
	+ '-'
	+ ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	+ '-' + date.getDate()
	+ ' ' + date.getHours()
	+ ':' + ((date.getMinutes() < 10) ? '0' + (date.getMinutes()) : date.getMinutes())
	+ ':' + ((date.getSeconds() < 10) ? '0' + (date.getSeconds()) : date.getSeconds());
	
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.docID="+req.params.id+" and \""+dateStr+"\" < a.time";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get appointments for a doctor patient combo
app.get('/appointments/:docID/:patientID', (req,  res) => {
	var query = "select u2.name as patient, u.name as doctor, a.time, a.details, a.ID from Appointments a join Doctors d on a.docID=d.ID join Users u on d.userID=u.ID join Patients p on a.patientID=p.ID join Users u2 on p.userID=u2.ID where a.docID=\""+req.params.docID+"\" and a.patientID=\""+req.params.patientID+"\"";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get prescriptions to be picked up given a patient
app.get('/prescriptions/pickup/:id', (req,  res) => {
	var query = "select pd.ID, u.name as patient, m.medName, m.dosage, m.quantity, m.details, ph.pharmName, ph.pharmHours, ph.address as pharmAddress, ph.phoneNumber as pharmPhoneNumber, di.directions, u2.name as doctor, pd.needRefill, pd.subRetriever, pd.readyForPickup, pd.pickupPrefTime, r.numDays as refillEveryXDays from PrescriptionDetails pd join Patients p on p.ID=pd.patientID join Users u on p.userID=u.ID join Doctors d on d.ID=pd.docID join Users u2 on d.userID=u2.ID join Directions di on pd.directions=di.ID join Medications m on pd.medID=m.ID join Pharmacies ph on pd.pharmID=ph.ID join RefillOccurence r on pd.refillEvery=r.ID where pd.readyForPickup=1 and pd.patientID="+req.params.id;
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get prescriptions given a patient
app.get('/prescriptions/patient/:id', (req,  res) => {
	var query = "select pd.ID, u.name as patient, m.medName, m.dosage, m.quantity, m.details, ph.pharmName, ph.pharmHours, ph.address as pharmAddress, ph.phoneNumber as pharmPhoneNumber, di.directions, u2.name as doctor, pd.needRefill, pd.subRetriever, pd.readyForPickup, pd.pickupPrefTime, r.numDays as refillEveryXDays from PrescriptionDetails pd join Patients p on p.ID=pd.patientID join Users u on p.userID=u.ID join Doctors d on d.ID=pd.docID join Users u2 on d.userID=u2.ID join Directions di on pd.directions=di.ID join Medications m on pd.medID=m.ID join Pharmacies ph on pd.pharmID=ph.ID join RefillOccurence r on pd.refillEvery=r.ID where pd.patientID="+req.params.id;
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get prescriptions given a doctor
app.get('/prescriptions/doctor/:id', (req,  res) => {
	var query = "select pd.ID, u.name as patient, m.medName, m.dosage, m.quantity, m.details, ph.pharmName, ph.pharmHours, ph.address as pharmAddress, ph.phoneNumber as pharmPhoneNumber, di.directions, u2.name as doctor, pd.needRefill, pd.subRetriever, pd.readyForPickup, pd.pickupPrefTime, r.numDays as refillEveryXDays from PrescriptionDetails pd join Patients p on p.ID=pd.patientID join Users u on p.userID=u.ID join Doctors d on d.ID=pd.docID join Users u2 on d.userID=u2.ID join Directions di on pd.directions=di.ID join Medications m on pd.medID=m.ID join Pharmacies ph on pd.pharmID=ph.ID join RefillOccurence r on pd.refillEvery=r.ID where pd.docID="+req.params.id;
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
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
	var query = "select u.name as patient, a.allergyName from PatientAllergies pa join Allergies a on pa.allergyID=a.ID join Patients p on pa.patientID=p.ID join Users u on p.userID=u.ID where patientID=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get all medications in inventory given pharmacy 
app.get('/medications/inventory/:id', (req,  res) => {
	var query = "select m.medName, m.dosage, m.quantity as pillCount, m.details, p.pharmName, p.pharmHours, p.address as pharmAddress, p.phoneNumber as pharmPhoneNumber, i.quantity, i.physicalLocation from Inventory i join Pharmacies p on i.pharmID=p.ID join Medications m on i.medID=m.ID where i.pharmID="+req.params.id;
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get specific medication in inventory for given pharmacy 
app.get('/medications/inventory/:pharmID/:medID', (req,  res) => {
	var query = "select m.medName, m.dosage, m.quantity as pillCount, m.details, p.pharmName, p.pharmHours, p.address as pharmAddress, p.phoneNumber as pharmPhoneNumber, i.quantity, i.physicalLocation from Inventory i join Pharmacies p on i.pharmID=p.ID join Medications m on i.medID=m.ID where i.pharmID="+req.params.pharmID+" and i.medID="+req.params.medID;
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get all notifications involving a given user
app.get('/notifications/:id', (req, res) => {
	var query = "select n.message, u.name as sender, u2.name as receiver, n.time from Notifications n join Users u on n.sender=u.ID join Users u2 on n.receiver=u2.ID where n.sender=\""+req.params.id+"\" or n.receiver=\""+req.params.id+"\"";
	
	connection.query(query, function(err, result, fields){
		res.status(200).send(result);
		return;
	})
})

//get notificationPref for a given patient
app.get('/notification/pref/:id', (req, res) => {
	var query = "select notificationPref from Patients where ID="+req.params.id;
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		res.status(200).send(result[0]);
	})
})

//get a user by id
app.get('/user/:id', (req, res) => {
	var query = 'select * from Users where ID=+'+req.params.id;
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		res.status(200).send(result[0]);
		return;
	})
})

//get a patient by id
app.get('/patient/:id', (req, res) => {
	var query = 'select * from Patients p join Users u on u.ID=p.userID where p.ID=+'+req.params.id;
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		res.status(200).send(result[0]);
		return;
	})
})

//get all patient medical records for a given doctor
app.get('/patient/records/:docID', (req, res) => {
	var query = 'select * from DoctorPatientLookup dp join Patients p on dp.patientID=p.ID join Users u on p.userID=u.ID join PrescriptionDetails pd on pd.patientID=p.ID join Medications m on pd.medId=m.ID join Directions d on pd.directions=d.ID left join PatientAllergies pa on pa.patientID=p.ID left join Allergies a on pa.allergyID=a.ID where dp.doctorID='+req.params.docID;

	connection.query(query, (err, result, fields) => {
		if(err){
			res.status(500).send('Database Error');
			return;
		}
		
		res.status(200).send(result);
	})
})

//get all doctors
app.get('/doctors', (req, res) => {
	var query = 'select * from Users u join Doctors d on u.ID=d.userID';
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		res.status(200).send(result);
		return;
	})

})

//get a doctor by id
app.get('/doctor/:id', (req, res) => {
	var query = 'select * from Users u join Doctors d on u.ID=d.userID where d.ID=+'+req.params.id;
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		res.status(200).send(result[0]);
		return;
	})
})

//get all pharmacists
app.get('/pharmacists', (req, res) => {
	var query = 'select * from Pharmacists p join Users u on p.userID=u.ID';
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		res.status(200).send(result);
		return;
	})

})

//get a pharmacist by id
app.get('/pharmacist/:id', (req, res) => {
	var query = 'select * from Users u join Pharmacists p on u.ID=p.userID where p.ID=+'+req.params.id;
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		res.status(200).send(result[0]);
		return;
	})
})

//gets all medications
app.get('/medications', (req, res) => {
	var query = 'select * from Medications';
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
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

//creates new allergy type
app.post('/allergy', (req, res) => {
	if(!req.body.allergyName){
		res.status(400).send("Missing Allergy Name");
		return;
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
	connection.query(`INSERT INTO Inventory (medID,pharmID,quantity) VALUES (${medicineID},${pharmacyID},${inputQuantity})`, function(err,result,fields) {
		if (err) {
			res.status(500).send("Failed to Add Medication");
		}
		res.status(200).send(result);
		return; 

	});
});

//Creates a new Prescription
/*app.post('/prescription', (req, res) => {
	let patientID = req.body.patientID
	let medID = req.body.medID
	let pharmID = req.body.pharmID
	let dir = req.body.directions
	let docID = req.body.docID
	let refill = req.body.refillEvery
	let sub = req.body.subRetriever
	let pickup = req.body.pickupPrefTime


	if (!(patientID && medID && pharmID && dir && docID && refill)) {
		res.status(400).send("Missing patientID, medID, pharmID, directions," +
						 	 " docID, OR refillEvery\n" +
							 "Optional Entry Data: subRetriever, pickupPrefTime");
		return;
	}

	if (!sub)
		sub = ""
	if (!pickup)
		pickup = ""
	
	var query = "insert into PrescriptionDetails(patientID, medID, pharmID, directions, docID, needRefill, subRetriever," +
		" readyForPickup, pickupPrefTime, refillEvery) values(" + patientID + ", " + medID + ", " + pharmID +
		", " + dir + ", " + docID + ", 0" + ", \"" + sub + "\", 0, \"" + pickup + "\", " + refill + ");";
	
	connection.query(query, function(err, result, fields){
		if(err){
			if(err.code == "ER_DUP_ENTRY")
				res.status(500).send("Duplicate Entry");
			else
				res.status(501).send("Failed to Create Prescription");
			return;
		} else{
			var date = new Date();
			dateStr = date.getYear() + 1900
            + '-'
            + ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            + '-' + date.getDate()
            + ' ' + date.getHours()
            + ':' + ((date.getMinutes() < 10) ? '0' + (date.getMinutes()) : date.getMinutes())
            + ':' + ((date.getSeconds() < 10) ? '0' + (date.getSeconds()) : date.getSeconds());
			
			
			var query2 = "insert into Notifications(message, sender, receiver, time) v"+
				"alues(\"Your Doctor added a new medication\", "+docID+", "+
				patientID+", \""+dateStr+"\");";
	
			connection.query(query2, function(err2, result2, fields2){
				if(err2){
					res.status(502).send("Failed to Create Notification");
					return;
				}
				
				res.status(200).send(result);
				return;
			})
		}
	})
})*/

//
app.post('/prescription', (req, res) => {
	let patientID = req.body.patientID
	let medName = req.body.medName
	let dosage = req.body.dosage
	let quantity = req.body.quantity
	let details = req.body.details
	let pharmName = req.body.pharmName
	let pharmHours = req.body.pharmHours
	let pharmAddress = req.body.pharmAddress
	let pharmPhoneNumber = req.body.pharmPhoneNumber
	let directions = req.body.directions
	let docID = req.body.docID
	let subRetriever = req.body.subRetriever
	let readyForPickup = req.body.readyForPickup
	let pickupPrefTime = req.body.pickupPrefTime
	let refillEveryXDays = req.body.refillEveryXDays

	if (!(patientID && medName && dosage && quantity && details && pharmName &&
		pharmHours && pharmAddress && pharmPhoneNumber && directions && docID &&
		subRetriever, readyForPickup, pickupPrefTime, refillEveryXDays)) {
		res.status(400).send("Missing prescription Information");
		return;
	}
	
	var medID;
	var pharmID;
	var directionsID;
	var refillEveryID;
	
	
	//gets the refillEveryID
	var query = 'select ID from RefillOccurence where numDays='+refillEveryXDays;
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send('Failed to get RefillOccurence.ID');
			return;
		}
		
		if(result.length == 0){
			var query2 = 'insert into RefillOccurence(numDays) values('+refillEveryXDays+')';
			
			connection.query(query2, function(err2, result2, fields2){
				if(err2){
					res.status(501).send('Failed to Create new RefillOccurence');
					return;
				}
				refillEveryID = result2.insertId;
			})
		} else {
			refillEveryID = result[0].ID;
		}
	})
	
	//gets the directionsID
	query = 'select ID from Directions where directions=\"'+directions+'\"';
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(502).send('Failed to get Directions.ID');
			return;
		}
		
		if(result.length == 0){
			var query2 = 'insert into Directions(directions) values(\"'+directions+'\")';
			
			connection.query(query2, function(err2, result2, fields2){
				if(err2){
					res.status(503).send('Failed to Create new Directions');
					return;
				}
				directionsID = result2.insertId;
			})
		} else {
			directionsID = result[0].ID;
		}
	})
	
	//gets the pharmID
	query = 'select ID from Pharmacies where pharmName=\"'+pharmName+'\" and pharmHours=\"'+pharmHours+'\" and address=\"'+pharmAddress+'\" and phoneNumber=\"'+pharmPhoneNumber+'\"';
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(504).send('Failed to get Pharmacy.ID');
			return;
		}
		
		if(result.length == 0){
			var query2 = 'insert into Pharmacies(pharmName, pharmHours, address, phoneNumber) values(\"'+pharmName+'\", \"'+pharmHours+'\", \"'+pharmAddress+'\", \"'+pharmPhoneNumber+'\")';
			
			connection.query(query2, function(err2, result2, fields2){
				if(err2){
					res.status(505).send('Failed to Create new Pharmacy');
					return;
				}
				pharmID = result2.insertId;
			})
		} else {
			pharmID = result[0].ID;
		}
	})
	
	//gets the medID
	query = 'select ID from Medications where medName=\"'+medName+'\" and dosage=\"'+dosage+'\" and quantity='+quantity+' and details=\"'+details+'\"';
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(506).send('Failed to get Medications.ID');
			return;
		}
		
		if(result.length == 0){
			var query2 = 'insert into Medications(medName, dosage, quantity, details) values(\"'+medName+'\", \"'+dosage+'\", '+quantity+', \"'+details+'\")';
			
			connection.query(query2, function(err2, result2, fields2){
				if(err2){
					res.status(507).send('Failed to Create new Medication');
					return;
				}
				medID = result2.insertId;
			})
		} else {
			medID = result[0].ID;
		}
	})
	
	setTimeout(()=>{
		//creates the new prescription
		query = 'insert into PrescriptionDetails(patientID, medID, pharmID, direc'+
				'tions, docID, needRefill, subRetriever, readyForPickup, pickupPr'+
				'efTime, refillEvery) values('+patientID+', '+medID+', '+pharmID+
				', '+directionsID+', '+docID+', 0, \"'+subRetriever+'\", '+
				readyForPickup+', \"'+pickupPrefTime+'\", '+refillEveryID+')';
		
		connection.query(query, function(err, result, fields){
			if(err){
				if(err.code == "ER_DUP_ENTRY")
					res.status(508).send("Duplicate Entry");
				else
					res.status(509).send("Failed to Create Prescription");
				return;
			} else{
				var date = new Date();
				dateStr = date.getYear() + 1900
				+ '-'
				+ ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
				+ '-' + date.getDate()
				+ ' ' + date.getHours()
				+ ':' + ((date.getMinutes() < 10) ? '0' + (date.getMinutes()) : date.getMinutes())
				+ ':' + ((date.getSeconds() < 10) ? '0' + (date.getSeconds()) : date.getSeconds());
				
				
				var query2 = "insert into Notifications(message, sender, receiver, time) v"+
					"alues(\"Your Doctor added a new medication\", "+docID+", "+
					patientID+", \""+dateStr+"\");";
		
				connection.query(query2, function(err2, result2, fields2){
					if(err2){
						res.status(510).send("Failed to Create Notification");
						return;
					}
					
					res.status(200).send(result);
					return;
				})
				
			}
		})
	}, 10);
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

//Creates a new Notification
app.post('/notification', (req, res) => {
	if(!req.body.message){
		res.status(400).send("Missing Message");
		return;
	} else if(!req.body.sender){
		res.status(401).send("Missing Sender");
		return;
	} else if(!req.body.receiver){
		res.status(402).send("Missing Receiver");
		return;
	} else if(!req.body.time){
		res.status(403).send("Missing Time");
		return;
	}
	
	var query = "insert into Notifications(message, sender, receiver, time) v"+
				"alues(\""+req.body.message+"\", "+req.body.sender+", "+
				req.body.receiver+", \""+req.body.time+"\");";
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed to Create Notification");
			return;
		}
		
		res.status(200).send(result);
		return;
	})
})

//Creates a new Appointment
app.post('/appointment', (req, res) => {
	if(!req.body.patientID){
		res.status(400).send("Missing Patient ID");
		return;
	} else if(!req.body.docID){
		res.status(401).send("Missing Doctor ID");
		return;
	} else if(!req.body.time){
		res.status(402).send("Missing Time");
		return;
	} else if(!req.body.details){
		res.status(403).send("Missing Details");
		return;
	}
	
	var query = "insert into Appointments(patientID, docID, time, details) v"+
				"alues("+req.body.patientID+", "+req.body.docID+", \""+
				req.body.time+"\", \""+req.body.details+"\");";
				
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed to Create Appointment");
			return;
		}
		
		res.status(200).send(result);
		return;
	})
})

//Creates a new medication
app.post('/medication', (req, res) => {
	if(!(req.body.medName && req.body.dosage && req.body.quantity && req.body.details)){
		res.status(400).send('Missing Medication Info');
		return;
	}
	
	var query = 'insert into Medications(medName, dosage, quantity, details) values(\"'+req.body.medName+'\", \"'+req.body.dosage+'\", '+req.body.medName+', \"'+req.body.details+'\")';
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Failed to Create Medication");
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

//Update Preferred Availability for Pickup
app.put('/prescriptions/updatePickup/:id', (req, res) => {
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

//updates a prescription
app.put('/prescription/:id', (req, res) => {
	var updateTable = true;
	var query = 'update PrescriptionDetails set ';
	
	if(req.body.patientID){
		query += 'patientID='+req.body.patientID;
	}
	
	if(req.body.medID){
		query += 'medID='+req.body.medID;
	}
	
	if(req.body.pharmID){
		query += 'pharmID='+req.body.pharmID;
	}
	
	if(req.body.directions){
		query += 'directions='+req.body.directions;
	}
	
	if(req.body.docID){
		query += 'docID='+req.body.docID;
	}
	
	if(req.body.needRefill){
		query += 'needRefill='+req.body.needRefill;
	}
	
	if(req.body.subRetriever){
		query += 'subRetriever='+req.body.subRetriever;
	}
	
	if(req.body.readyForPickup){
		query += 'readyForPickup='+req.body.readyForPickup;
	}
	
	if(req.body.pickupPrefTime){
		query += 'pickupPrefTime='+req.body.pickupPrefTime;
	}
	
	if(req.body.refillEvery){
		query += 'refillEvery='+req.body.refillEvery;
	}
	
	if(query.slice(-4) == 'set '){
		updateTable = false;
	}
	else{
		query = query.slice(0, -2);
		query += ' where ID='+req.params.id
	}
	
	if(updateTable){
		connection.query(query, function(err, result, fields){
			if(err2){
				res.status(500).send("Database Error");
				return;
			}
			res.status(200).send(result);
			return;
		})
	} else {
		res.status(400).send('Missing Prescription Info');
		return;
	}
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

//Change notificationPref for a given patient
app.put('/notifications/pref/:id', (req, res) => {
	var query = "update Patients set notificationPref = not notificationPref "
				+ "where ID=" + req.params.id;
	connection.query(query, function (err, result, fields) {
		if(err){
			res.status(500).send("Failed to Update notificationPref.");
			return;
		}
		res.status(200).send(result);
		return;
	})
	
})

//update Preferred pharmacy preference 
app.put('/patients/updatePharmacy/:id', (req,res)=>{
	if(!(req.body.pharmacy)){
		res.status(400).send("Missing Pharmacy Preference Information");
		return;
	}
	var query = "update Patients set pharmacyPref = \"" + req.body.pharmacy
	+ "\" where patientID =\"" + req.params.id + "\"";
	connection.query(query,function(err,result,fields){
		if(err){
			res.status(500).send("Failed to Update Preferred Pharmacy.");
			return;
		}
		res.status(200).send(result);
		return;
	})

})

//update an Appointment
app.put('/appointment/:id', (req, res) => {
	if(!(req.body.patientID || req.body.docID || req.body.time || req.body.details)){
		res.status(400).send("Missing update information");
	}
	
	var query = 'update Appointments set ';
	
	if(req.body.patientID){
		query += 'patientID='+req.body.patientID+', ';
	}
	
	if(req.body.docID){
		query += 'docID='+req.body.docID+', ';
	}
	
	if(req.body.time){
		query += 'time=\"'+req.body.time+'\", ';
	}
	
	if(req.body.details){
		query += 'details=\"'+req.body.details+'\", ';
	}
	
	query = query.slice(0, -2);
	query += ' where ID='+req.params.id;
	
	connection.query(query,function(err,result,fields){
		if(err){
			res.status(500).send("Failed to Update Appointment");
			return;
		}
		res.status(200).send(result);
		return;
	})
})

//update a user info
app.put('/user/:id', (req, res) => {
	var query = 'select * from Users where ID='+req.params.id;
	
	connection.query(query, function(err, result, fields){
		if(err){
			res.status(500).send("Database error");
			return;
		}
		
		var query2 = 'update Users set ';
		var updateTable = true;
	
		if(req.body.name){
			query2 += 'name=\"'+req.body.name+'\", ';
		}
		
		if(req.body.password){
			query2 += 'password=\"'+req.body.password+'\", ';
		}
		
		if(req.body.email){
			query2 += 'email=\"'+req.body.email+'\", ';
		}
		
		if(query2.slice(-4) == 'set '){
			updateTable = false;
		}
		else{
			query2 = query2.slice(0, -2);
			query2 += ' where ID='+req.params.id
		}
		
		if(updateTable){
			connection.query(query2, function(err2, result2, fields){
				if(err2){
					res.status(501).send("Failed to Update Users Table");
					return;
				}
			})
		} 
		
		updateTable = true;
		var query2 = 'update ';	
		switch(result[0].type){
			case 1:
				query2 += 'Patients set ';
				
				if(req.body.notificationPref){
					query2 += 'notificationPref='+req.body.notificationPref+', ';
				}
				
				if(req.body.pharmacyPref){
					query2 += 'pharmacyPref='+req.body.pharmacyPref+', ';
				}
				
				if(req.body.ssn){
					query2 += 'ssn=\"'+req.body.ssn+'\", ';
				}
				
				break;
			case 3:
				query2 += 'Pharmacists set ';
				
				if(req.body.pharmID){
					query2 += 'pharmID='+req.body.pharmID+', ';
				}
		}
		
		if(query2.slice(-4) == 'set ' || result[0].type == 2){
			updateTable = false;
		}
		else{
			query2 = query2.slice(0, -2);
			query2 += ' where userID='+req.params.id
		}
		
		if(updateTable){
			connection.query(query2, function(err3, result3, fields){
				if(err3){
					res.status(502).send("Failed to Update Typed Table");
					return;
				}
			})
		}
		
		res.status(200).send("Success in Updating User");
		return;
	})
})

///////////
//DELETE///
///////////

//need to test still 
app.delete('/appointment/:id', (req,res)=>{

	var appointmentID = req.params.id
	connection.query('DELETE FROM Appointments WHERE Appointments.ID = '+appointmentID,function(err,result,fields){
		if(err){
			res.status(500).send("Failed to Delete Appointment.");
			return;
		}
		res.status(200).send(result);
		return;	
	
	})

})

app.delete('/notification/:id', (req, res) =>{
	var query = 'delete from Notifications where Notifications.ID='+req.params.id;
	
	connection.query(query, (err, result, fields) => {
		if(err){
			res.status(500).send('Database Error');
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