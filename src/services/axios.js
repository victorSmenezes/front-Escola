import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cursojs.servehttp.com',
});

export default api;
