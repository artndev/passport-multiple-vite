import axios from 'axios'
import config from './config.json'

const instance = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
