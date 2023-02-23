import axios from "axios";

const api = axios.create({
    baseURL: 'https://168e-201-15-38-159.ngrok.io',
    headers: {'Content-Type': 'application/json'}
});

export {api};