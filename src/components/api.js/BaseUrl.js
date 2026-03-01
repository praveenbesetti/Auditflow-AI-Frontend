import axios from 'axios';

export const baseURL = "https://certified-abu-trade-diff.trycloudflare.com/";

axios.defaults.withCredentials = true;

axios.defaults.headers.post['Content-Type'] = 'application/json';