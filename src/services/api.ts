import axios from "axios";

const api = axios.create({
    baseURL: 'https://b688-200-181-182-178.ngrok.io',
    headers: {'Content-Type': 'application/json'}
});

export {api};