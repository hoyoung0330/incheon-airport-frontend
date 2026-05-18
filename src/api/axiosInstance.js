import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 오류:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance