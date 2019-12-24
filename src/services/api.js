//import { AsyncStorage } from 'react-native'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://18.231.110.235:3333',
    headers: {
        'Content-Type': 'application/json',
    },
    //baseURL: 'http://10.0.2.2:3333'
})

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("@OlhoFake:token");
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
});

export default api;
