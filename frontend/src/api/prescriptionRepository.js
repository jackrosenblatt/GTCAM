import axios from 'axios';

export class PrescriptionRepository {
    
    url = 'http://localhost:8000'
    config = {

    };

    getPrescriptionsByPatient(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/prescriptions/patient/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getPrescriptionsToPickUp(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/prescriptions/pickup/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getPrescriptionsByDoctor(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/prescriptions/doctor/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    createNewPrescription(prescrip) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/prescription`, prescrip, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    createNewPrescriptionDirections(dirs) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/prescriptions/directions`, dirs, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }
}