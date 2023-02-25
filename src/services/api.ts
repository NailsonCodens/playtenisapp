import axios from "axios";

const api = axios.create({
    baseURL: 'https://5c5f-201-15-38-159.ngrok.io',
    headers: {'Content-Type': 'application/json'}
});

export {api};