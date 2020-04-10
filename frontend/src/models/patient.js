export class Patient {
    constructor(id, userID, notificationPreference, pharmacyPreference, ssn, allergies)
    {
        this.id = id;
        this.userID = userID;
        this.notificationPreference = notificationPreference;
        this.pharmacyPreference = pharmacyPreference;
        this.ssn = ssn;
        this.allergies = allergies;
    }
}