import axios from 'axios';

export class PrescriptionRepository {
    url='http://localhost:8000'
    config = {

    };

    getPrescriptionsForPatient(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/prescriptions/patient/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
            });
        }
    
    getPrescriptionsToPickupForPatient(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/prescriptions/pickup/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
            });
        }

    getDirectionsForPrescription(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/prescriptions/directions/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
            });
        }

    createPrescription(prescrip) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/prescription`, prescrip, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
            });
        }

    createDirectionsForPrescription() {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/prescription`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
            });
    }

    editSubRetriever(id, name) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/prescriptions/updatePickup/${id}`, name, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    editpickupPrefTime(id, preftime) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/prescriptions/pickup/${id}`, preftime, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }
    

}