import axios from 'axios';

export class AppointmentRepository {
    url = 'localhost:8000'

    config ={

    };

    getAppointmentsPatient(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/appointments/patient/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getAppointmentsDoctor(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/appointments/doctor/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    createAppointment(appointment) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/appointments`, appointment, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    cancelAppointmentById(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/appointments/delete/${id}`, this.config)
                .then(x=> resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    updateAppointmentById(id, appt) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/appointment/${id}`, appt, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

}