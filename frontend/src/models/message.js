export class Message {
    constructor(id, patientID, toUser,message) {
        this.id = id;
        this.patientID = patientID;
        this.toUser = toUser;
        this.message = message;
    }
}