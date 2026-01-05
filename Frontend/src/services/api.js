import axios from "axios"

const api = axios.create({
    baseURL: 'https://aire-mjuh.onrender.com',
    withCredentials: true
})

export default api