export class Prescription {
    constructor(id, patientname, medname, date, dosage, quantity, details, directions) {
        this.id = id;
        this.patientname = patientname;
        this.medname = medname;
        this.date = date;
        this.dosage = dosage;
        this.quantity = quantity;
        this.details = details;
        this.directions = directions;
    }
}