export class Prescription {
    constructor(patientname, medname, date, dosage, quantity, details) {
        this.patientname = patientname;
        this.medname = medname;
        this.date = date;
        this.dosage = dosage;
        this.quantity = quantity;
        this.details = details;
    }
}