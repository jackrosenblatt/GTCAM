import axios from 'axios';

export class PharmacyRepository {
    url = 'http://localhost:8000'

    config = {

    };

    getPharmacies() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/pharmacies`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getPharmacy(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/pharmacies/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

}