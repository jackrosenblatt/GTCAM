import axios from 'axios';

export class PharmacistRepository {

    url = 'http://localhost:8000'
    config = {

    };

    getPharmacist() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/pharmacists`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getPharmacistById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/pharmacist/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

}