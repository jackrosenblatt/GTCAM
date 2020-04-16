export class Patient {
    constructor(id, name, userID, address, notificationPreference, pharmacyPreference, 
                ssn, allergies,doctorname,medicalinfo){
        this.id = id;
        this.name = name;
        this.userID = userID;
        this.address = address;
        this.notificationPreference = notificationPreference;
        this.pharmacyPreference = pharmacyPreference;
        this.ssn = ssn;
        this.allergies = allergies;
        this.doctorname = doctorname;
        this.medicalinfo = medicalinfo;
    }
}