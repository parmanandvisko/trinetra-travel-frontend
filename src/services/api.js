import axios from 'axios'

const BACKEND_URL ='https://api.trinetraglobalholidays.com/api' 
// const BACKEND_URL ='http://localhost:5012/api' 

const api = axios.create({  
  baseURL: BACKEND_URL,
  timeout: 15000,
})

export default api
