import axios from 'axios'

const apiClient = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: 'https://api-bookcase.herokuapp.com',
  withCredentials: true
})

export default apiClient
