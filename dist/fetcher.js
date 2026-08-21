import axios from 'axios';
export default (url) => {
    return axios.get(url).then(response => response.data).catch(error => 'error');
};
