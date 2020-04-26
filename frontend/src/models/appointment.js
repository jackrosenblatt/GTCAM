export class Appointment {
    constructor(id, patient, doctor, date, time, details) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.date =date;
        this.time = time;
        this.details = details;
    }
}