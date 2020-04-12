export class Appointment {
    constructor(id, patientName, doctorName, time, details) {
        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.time = time;
        this.details = details;
    }
}