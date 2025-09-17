import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cursojs.servehttp.com/api',
});

export default api;
