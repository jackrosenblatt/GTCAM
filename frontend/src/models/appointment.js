export class Appointment {
    constructor(id, patientID, doctorID, time, details) {
        this.id = id;
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.time = time;
        this.details = details;
    }
}