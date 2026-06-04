import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.trinetraglobalholidays.com/api'

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 15000,
})

export default api
