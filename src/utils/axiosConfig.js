import axios from 'axios';
import { toast } from 'react-toastify';

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', // Replace with your API base URL
  withCredentials: true, // This will include cookies with every request
  headers: {
    'Content-Type': 'application/json'
  }
});

// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 400 && error.response.data['msg'] == "Authentication Invalid") {
//       toast.error(error.response.data.msg)
//       localStorage.setItem('Failed', true)
//       window.location.href = '/login';
//     }
//   });

export default axiosInstance;
