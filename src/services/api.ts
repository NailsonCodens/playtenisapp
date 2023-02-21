import axios from "axios";

const api = axios.create({
    baseURL: 'https://65ee-200-181-182-178.ngrok.io',
    headers: {'Content-Type': 'application/json'}
});

export {api};