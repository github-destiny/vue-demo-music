import axios from 'axios';

const base_url = 'http://47.93.16.214:3000';

export default {
    get: function (uri) {
        return axios.get(`${base_url}/${uri}`)
    },
    post : function (uri) {
        return axios.post(`${base_url}/${uri}`)
    }
}
