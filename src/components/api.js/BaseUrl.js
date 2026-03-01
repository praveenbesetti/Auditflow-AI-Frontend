import axios from 'axios';

export const baseURL = "https://wonderful-friendly-artists-bias.trycloudflare.com/";

axios.defaults.withCredentials = true;

axios.defaults.headers.post['Content-Type'] = 'application/json';