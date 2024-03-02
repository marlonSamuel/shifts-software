import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(
    async(config:any) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = 'Bearer '+token
        }
        return config;
    }
)

api.interceptors.response.use(resp => {
    return resp;
}, error => {
    if(error.code === 'ERR_NETWORK') return Promise.reject({error: 'Error de conexión'});
    return Promise.reject(error.response.data);
});

export default api;