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
                    localStorage.setItem('name', resp.data.name);
                    localStorage.setItem('email', resp.data.email);
                    localStorage.setItem('userID', resp.data.userID);
                    localStorage.setItem('type', resp.data.type);
                    localStorage.setItem('id', resp.data.id);
                    if (resp.data.type === '1')
                    {
                        localStorage.setItem('notifPref', resp.data.notificationPref);
                        localStorage.setItem('pharmPref', resp.data.pharmacyPref);
                    }
                    else if(resp.data.type === '3')
                    {
                        localStorage.setItem('pharmID', resp.data.pharmID);
                    }
                    resolve(resp.data);
                })
                .catch(resp => reject(resp));
        });
    }

    getUser(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.url + 'user/' + id)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }


}