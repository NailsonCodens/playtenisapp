import axios from "axios";

const api = axios.create({
    baseURL: 'https://3d35-201-15-38-159.ngrok.io',
    headers: {'Content-Type': 'application/json'}
});

export {api};