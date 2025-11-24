import axios from 'axios';

const BASE_URL = 'https://naves-back.onrender.com/api/naves';

class NavesService {

    getAllNaves() {
        return axios.get(BASE_URL);
    }

    getNaveById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    createNave(nave) {
        return axios.post(BASE_URL, nave);
    }

    updateNave(id, nave) {
        return axios.put(`${BASE_URL}/${id}`, nave);
    }

    deleteNave(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new NavesService();