import axios from 'axios';

export class PatientRepository {

    url = 'http://localhost:8000'
    config = {

    };

    getPatient(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/doctors/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }
}