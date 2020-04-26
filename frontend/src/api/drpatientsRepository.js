import axios from 'axios';

export class DrPatientRepository {

    url='http://localhost:8000'
    
    config={ };

    getPatientById(docID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/patient/records/${docID}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }

}