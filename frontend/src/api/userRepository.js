import axios from 'axios';

export class UserRepository {

    url='http://localhost:8000'
    config={

    };
    registerUser(user) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/register`, user)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        });
    }

    userLogin(user) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/login`, user)
                .then(resp => {
                    console.log(resp.data);
                    localStorage.setItem('name', resp.data[0].name);
                    localStorage.setItem('email', resp.data[0].email);
                    localStorage.setItem('userID', resp.data[0].userID);
                    localStorage.setItem('type', resp.data[0].type);
                    localStorage.setItem('id', resp.data[0].ID);
                    if (resp.data.type === 1)
                    {
                        localStorage.setItem('notifPref', resp.data[0].notificationPref);
                        localStorage.setItem('pharmPref', resp.data[0].pharmacyPref);
                    }
                    else if(resp.data.type === 3)
                    {
                        localStorage.setItem('pharmID', resp.data[0].pharmID);
                    }
                    console.log(localStorage.getItem('id'));
                    resolve(resp.data);
                })
                .catch(resp => reject(resp));
        });
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${id}`, this.config)
                .then(resp => {
                    resolve(resp.data)
                }) 
                .catch(resp => reject(resp.data));
        });
    }

    getPatientById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/patient/${id}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }

    editUserById(id, user) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/user/${id}`, user, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

}