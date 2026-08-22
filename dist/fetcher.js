import axios from 'axios';
const fetcher = (url) => {
    return axios
        .get(url)
        .then(response => response.data);
};
export default fetcher;
