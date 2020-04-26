import axios from 'axios';

export class AllergyRepository {

    url = 'http://localhost:8000';
    config = {

    };

    createNewAllergy(allergy){
         return new Promise((resolve, reject) => {
             axios.post(`${this.url}/allergy`, allergy, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
         })
    }

    getAllergies() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/allergies`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }

    getAllergiesByPatient(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/patient/allergies/${id}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }

    addAllergyForPatient(id, allergy) {
        
    }

}