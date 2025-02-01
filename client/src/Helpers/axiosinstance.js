import axios from 'axios'

const axiosinstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Set the base URL
    withCredentials: true, // Enable credentials
  });



export default axiosinstance
