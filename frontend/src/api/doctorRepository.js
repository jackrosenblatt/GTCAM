import axios from 'axios';

export class DoctorRepository {

    url = 'http://localhost:8000'
    config = {

    };

    getDoctors() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/doctors`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }
}