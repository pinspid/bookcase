import axios from 'axios'

const apiClient = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

export default apiClient
