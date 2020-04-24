export class Appointment {
    constructor(id, patientName, doctorName, date, time, details) {
        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.date =date;
        this.time = time;
        this.details = details;
    }
}