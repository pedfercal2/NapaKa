import axios from "axios";

// Elemento de apoyo para la gestión de peticiones mediante AXIOS
// Uso la dirección de mi servidor
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Agrego un header con el token de inicio, si éste existe
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Gestion de errores de petición, limpiando un posible token incorrecto
axiosClient.interceptors.response.use(
    (response) => {
    return response;
},
(error) => {
    try {
        const response = error
        if(response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }   
    } catch (err) {
        console.log(response)
        console.error(err)
    }
    throw error;
}

)

export default axiosClient;