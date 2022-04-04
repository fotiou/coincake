import axios from 'axios';

export default axios.create({
    baseURL: `api.coincap.io/v2/`,
});
