import axios from 'axios';

export const baseURL = "https://twenty-tried-folder-develop.trycloudflare.com/";

axios.defaults.withCredentials = true;

axios.defaults.headers.post['Content-Type'] = 'application/json';