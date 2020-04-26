import axios from 'axios';

export class MessageRepository {
    url='http://localhost:8000'
    config = {

    };

    getMessagesForUser(id) {
        return new Promise((resolve, reject) => {
        axios.get(`${this.url}/notifications/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    createMessage(message) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/notification`, message, this.config)
                    .then(x => resolve(x.data))
                    .catch(x => {
                        alert(x);
                        reject(x);
                    });
            });
    }
}